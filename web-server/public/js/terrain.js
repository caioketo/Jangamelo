var self;
var Terrain = function () {
    self = this;
	this.terrain = {
		size: {
			x: 1200,
			y: 1200
		},
		resolution: {
			x: 10,
			y: 10
		},
		geometry: null
	};
	this.container = this.createContainer();
	this.scene = this.createScene();
	this.sceneMain();
	this.camera = this.createCamera();
	this.renderer = this.createRenderer();
	
	this.terrain.geometry = this.createTerrain();

	this.setupEvents();
};

Terrain.prototype.createTerrain = function() {
	var geometry = new THREE.PlaneGeometry(
		this.terrain.size.x,
		this.terrain.size.y,
		this.terrain.resolution.x,
		this.terrain.resolution.y
	);
	geometry.dynamic = true;
	this.buildTerrain(geometry);
	return geometry;
};

Terrain.prototype.refresh = function () {
    this.geometry.__dirtyVertices = true; 
    this.geometry.computeCentroids();
};

Terrain.prototype.applyTerrainTransform = function(fn) { 
    var geometry = fn(this.geometry); 
    this.refresh();
    this.buildTerrain(geometry); 
    this.geometry = geometry; 
    return geometry; 
};

Terrain.prototype.buildTerrain = function(geometry) {
	// var texture = self.createTerrainTexture();
	var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: 0xcccccc}));
	mesh.rotation.x = -90 * Math.PI / 180;
	this.scene.remove(this.scene.getChildByName("Terrain"));
	mesh.name = "Terrain";
	this.scene.add(mesh);
};

Terrain.prototype.raiseTerrain = function(geometry) { 
    for (var i = 0; i < geometry.vertices.length; i++) { 
        geometry.vertices[i].position.z += 3; 
    } 
    return geometry; 
};

Terrain.prototype.createContainer = function() {
	var div = document.createElement('div');
	document.body.appendChild(div);
	return div;
};

Terrain.prototype.createScene = function() {
	return new THREE.Scene();
};

Terrain.prototype.sceneMain = function() {
	var pointLight = new THREE.PointLight(0xffffcc);
	pointLight.intensity = 1;
	pointLight.position = new THREE.Vector3(1000, 800, -1000);
	this.scene.add(pointLight);
	
	var waterGeom = new THREE.PlaneGeometry(this.terrain.size.x, this.terrain.size.y, 1, 1);
	var waterMesh = new THREE.Mesh(waterGeom, new THREE.MeshLambertMaterial({color: 0x6699ff}));
	waterMesh.rotation.x = -90 * Math.PI / 180;
	waterMesh.name = "Water";
	this.water = waterMesh;
};

Terrain.prototype.createCamera = function() {
	var camera = new THREE.PerspectiveCamera(
		65,                                     // Field of View
		window.innerWidth / window.innerHeight, // Aspect Ratio
		10,                                     // Near clipping plane
		5000                                    // Far clipping plane
	);
	camera.position = new THREE.Vector3(0, 600, 1000);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	this.scene.add(camera);
	return camera;
};


Terrain.prototype.createRenderer = function() {
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	this.container.appendChild(renderer.domElement);
	return renderer;
};

Terrain.prototype.render = function() {
	this.renderer.render(this.scene, this.camera);
};

Terrain.prototype.run = function(fps) {
	this.render();
	setTimeout(
		function() {
			self.run(fps);
		},
		1 / fps * 1000
	);
};

var myClient = new Terrain({
});
myClient.run(60);