void setup() {
  size(700, 700, P3D);
  noStroke();
}

void draw() {
  background(240);
  lights();

  float t = frameCount * 0.02;

  float A = 150;
  float B = 100;
  float tx = A * sin(t);
  float ty = B * sin(t) * cos(t);

  float angleX = t;
  float angleY = t * 0.7;

  // Dynamic scale
  float scaleFactor = 1 + 0.9 * sin(t * 1.5);

  // Center
  translate(width/2, height/2, 0);

  // PushMatrix
  pushMatrix();
  
  translate(tx, ty, 0);
  rotateX(angleX);
  rotateY(angleY);
  scale(scaleFactor);

  fill(255, 200, 200);
  box(100);

  popMatrix();
}
