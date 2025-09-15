    // Access the canvas element and its 2D rendering context
    var canvas = document.getElementById("canvas");
    const width = canvas.width; // Canvas width
    const height = canvas.height; // Canvas height
    var gl = canvas.getContext("2d"); // 2D drawing context

    const timeout = 50; // Timeout for animation update
    const f = 500;  // Focal length for 3D projection (larger values make objects smaller)
    const D = 500;  // Distance from the viewer (larger values make objects appear smaller)

    function update() {
  
        setTimeout(update, timeout);  // Continuously update the canvas
    }
    setTimeout(update, timeout);

    function clearScreen() {
        gl.fillStyle = "blue";  // Set background color to blue
        gl.fillRect(0, 0, width, height);  // Fill the entire canvas with the color
        gl.fill();  // Apply the fill
    }
    function update() {
        clearScreen(); // Clear the screen before drawing

    
        
        setTimeout(update, timeout);
    }    
    function point(x, y, radius = 5, color = "white") {
        gl.fillStyle = color;  // Set the color for the point
        gl.beginPath();  // Start a new drawing path
        gl.arc(x, y, radius, 0, 2 * Math.PI, true);  // Draw a circle (point) at (x, y)
        gl.fill();  // Fill the circle with the chosen color
        gl.closePath();  // Close the drawing path
    }

    function line(x1, y1, x2, y2, width = 2, color = "white") {
        gl.strokeStyle = color;  // Set the color for the line
        gl.lineWidth = width;  // Set the width of the line
        gl.beginPath();  // Start a new drawing path
        gl.moveTo(x1, y1);  // Move to the start point
        gl.lineTo(x2, y2);  // Draw a line to the end point
        gl.stroke();  // Apply the stroke to render the line
    }

    // the vector class to represent a 3D vector (point)
class vector {
    constructor(x, y, z) {
        this.x = x; // x-coordinate
        this.y = y; // y-coordinate
        this.z = z; // z-coordinate
    }

 
    // Convert a 3D point to a 2D point for drawing
    get_point2d() {
        return project3Dto2D(this.x, this.y, this.z);
    }

    // Draw the point on the canvas
    draw() {
        var pt2d = this.get_point2d(); // Get the 2D coordinates
        point(pt2d.x, pt2d.y); // Draw the point on the canvas
    }

    // Rotate the vector around the X-axis
    rotateX(theta) {
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);
        const yNew = this.y * cosTheta - this.z * sinTheta;
        const zNew = this.y * sinTheta + this.z * cosTheta;
        this.y = yNew;
        this.z = zNew;
    }

    // Rotate the vector around the Y-axis
    rotateY(theta) {
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);
        const xNew = this.x * cosTheta + this.z * sinTheta;
        const zNew = -this.x * sinTheta + this.z * cosTheta;
        this.x = xNew;
        this.z = zNew;
    }

    // Rotate the vector around the Z-axis
    rotateZ(theta) {
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);
        const xNew = this.x * cosTheta - this.y * sinTheta;
        const yNew = this.x * sinTheta + this.y * cosTheta;
        this.x = xNew;
        this.y = yNew;
    }

    // Scale the vector by a factor relative to the center
    scale(scaleFactor, center) {
        this.x = (this.x - center.x) * scaleFactor + center.x;
        this.y = (this.y - center.y) * scaleFactor + center.y;
        this.z = (this.z - center.z) * scaleFactor + center.z;
    }
}

function project3Dto2D(x, y, z) {
    let x2D = (x / (z + D)) * f + width / 2;
    let y2D = -(y / (z + D)) * f + height / 2;
    return { x: x2D, y: y2D };  // Return the 2D coordinates
}

// Class to represent a 3D model (collection of points and edges)
class model {
    constructor(name, points, edges = []) {
        this.name = name; // Name of the model
        this.points = points; // Array of 3D points
        this.edges = edges; // Array of edges connecting the points
    }

    // Draw the model on the canvas
    draw() {
        // First, draw the points
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].draw(); // Draw each point using the draw method from the vector class
        }

        // Then, draw the edges connecting the points
        for (let i = 0; i < this.edges.length; i++) {
            var start = this.edges[i][0].get_point2d(); // Start point of the edge
            var end = this.edges[i][1].get_point2d(); // End point of the edge
            line(start.x, start.y, end.x, end.y); // Draw the line between the two points
        }
    }

    // Rotate the model around the X-axis
    rotateX(theta) {
        theta = theta * Math.PI / 180;
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].rotateX(theta);
        }
    }

    // Rotate the model around the Y-axis
    rotateY(theta) {
        theta = theta * Math.PI / 180;
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].rotateY(theta);
        }
    }

    // Rotate the model around the Z-axis
    rotateZ(theta) {
        theta = theta * Math.PI / 180;
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].rotateZ(theta);
        }
    }

    // Scale the model by a factor relative to the center of the model
    scale(scaleFactor) {
        // Find the center of the model
        const center = this.getCenter();

        // Scale all points relative to the center
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].scale(scaleFactor, center);
        }
    }

    // Get the center of the model by averaging all points
    getCenter() {
        let centerX = 0, centerY = 0, centerZ = 0;
        for (let i = 0; i < this.points.length; i++) {
            centerX += this.points[i].x;
            centerY += this.points[i].y;
            centerZ += this.points[i].z;
        }
        return new vector(centerX / this.points.length, centerY / this.points.length, centerZ / this.points.length);
    }
}

// Define the points for the cube model (8 vertices of a cube in 3D space)
const points = [
    vec(-100, -100, -100), // Bottom-left-front
    vec(100, -100, -100), // Bottom-right-front
    vec(100, 100, -100), // Top-right-front
    vec(-100, 100, -100), // Top-left-front
    vec(-100, -100, 100), // Bottom-left-back
    vec(100, -100, 100), // Bottom-right-back
    vec(100, 100, 100), // Top-right-back
    vec(-100, 100, 100) // Top-left-back
];

// Define the edges connecting the points to form a cube (12 edges)
const edges = [
    [points[0], points[1]], [points[1], points[2]], [points[2], points[3]], [points[3], points[0]],  // Bottom face
    [points[4], points[5]], [points[5], points[6]], [points[6], points[7]], [points[7], points[4]],  // Top face
    [points[0], points[4]], [points[1], points[5]], [points[2], points[6]], [points[3], points[7]]   // Sides
];
mdl = create_model("cube", points, edges);
mdl.scale(1);  // Initial scaling of the model

// Function to update the canvas, clear the screen, and draw the model
function update() {
    clearScreen(); // Clear the screen before drawing

    // Create the model using the points and edges defined above
    

    mdl.rotateY(10);
 

    // Draw the model
    mdl.draw();

    // Continuously update the canvas at the specified timeout interval
    setTimeout(update, timeout);
}