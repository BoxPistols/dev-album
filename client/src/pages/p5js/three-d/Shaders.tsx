import PageNavigation from "@/components/PageNavigation";
export const T0 = `let blobShader;
function setup() {
  createCanvas(600, 400, WEBGL);
  noStroke();
  blobShader = buildMaterialShader(blob);
}
function blob() {
  let t = millis() * 0.001;
  objectInputs.begin();
  let p = objectInputs.position;
  let bump = noise(p.x * 0.012 + t * 0.4, p.y * 0.012, p.z * 0.012 - t * 0.2);
  objectInputs.position += objectInputs.normal * bump * 70;
  objectInputs.end();
}
function draw() {
  background(14, 16, 30);
  ambientLight(120);
  directionalLight(255, 255, 255, 0.4, 0.8, -0.5);
  rotateY(frameCount * 0.004);
  shader(blobShader);
  fill(255);
  sphere(105, 80, 60);
}`;

export const T1 = `let blobShader;
function setup() {
  createCanvas(600, 400, WEBGL);
  noStroke();
  blobShader = buildMaterialShader(blob);
}
function blob() {
  let t = millis() * 0.001;
  objectInputs.begin();
  let bump = sin(objectInputs.position.y * 0.05 + t * 2);
  objectInputs.position += objectInputs.normal * bump * 20;
  objectInputs.end();
}
function draw() {
  background(14, 16, 30);
  ambientLight(120);
  directionalLight(255, 255, 255, 0.4, 0.8, -0.5);
  rotateY(frameCount * 0.004);
  shader(blobShader);
  fill(255);
  sphere(105, 80, 60);
}`;

export const T2 = `let blobShader;
function setup() {
  createCanvas(600, 400, WEBGL);
  noStroke();
  blobShader = buildMaterialShader(blob);
}
function blob() {
  let t = millis() * 0.001;
  let bump = sharedFloat();
  objectInputs.begin();
  bump = sin(objectInputs.position.y * 0.05 + t * 2) * 0.5 + 0.5;
  objectInputs.position += objectInputs.normal * bump * 30;
  objectInputs.end();
  finalColor.begin();
  finalColor.set(finalColor.color * mix([0.2, 0.5, 1, 1], [1, 0.45, 0.6, 1], bump));
  finalColor.end();
}
function draw() {
  background(14, 16, 30);
  ambientLight(120);
  directionalLight(255, 255, 255, 0.4, 0.8, -0.5);
  rotateY(frameCount * 0.004);
  shader(blobShader);
  fill(255);
  sphere(105, 80, 60);
}`;

export const T3 = `let blobShader;
function setup() {
  createCanvas(600, 400, WEBGL);
  noStroke();
  blobShader = buildMaterialShader(blob);
}
function blob() {
  let t = millis() * 0.001;
  let bump = sharedFloat();
  worldInputs.begin();
  let p = worldInputs.position;
  bump = noise(p.x * 0.012 + t * 0.4, p.y * 0.012, p.z * 0.012);
  worldInputs.position += worldInputs.normal * (bump - 0.5) * 80;
  worldInputs.end();
  finalColor.begin();
  finalColor.set(finalColor.color * mix([0.2, 0.5, 1, 1], [1, 0.45, 0.6, 1], bump));
  finalColor.end();
}
function draw() {
  background(14, 16, 30);
  ambientLight(120);
  directionalLight(255, 255, 255, 0.4, 0.8, -0.5);
  rotateY(frameCount * 0.004);
  shader(blobShader);
  fill(255);
  sphere(105, 80, 60);
}`;

export const T4 = `let blobShader;
function setup() {
  createCanvas(600, 400, WEBGL);
  noStroke();
  blobShader = buildMaterialShader(blob);
}
function blob() {
  let t = millis() * 0.001;
  let bump = sharedFloat();
  objectInputs.begin();
  let p = objectInputs.position;
  bump = noise(p.x * 2 + t * 0.4, p.y * 2, p.z * 2);
  objectInputs.position += objectInputs.normal * (bump - 0.5) * 0.5;
  objectInputs.end();
  finalColor.begin();
  finalColor.set(finalColor.color * mix([0.2, 0.5, 1, 1], [1, 0.45, 0.6, 1], bump));
  finalColor.end();
}
function draw() {
  background(14, 16, 30);
  ambientLight(120);
  directionalLight(255, 255, 255, 0.4, 0.8, -0.5);
  rotateY(frameCount * 0.004);
  shader(blobShader);
  fill(255);
  sphere(105, 80, 60);
}`;

export default function Shaders() { return <PageNavigation />; }
