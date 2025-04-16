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

  // Escala dinámica
  float scaleFactor = 1 + 0.9 * sin(t * 1.5);

  // Centrar
  translate(width/2, height/2, 0);

  // Transformaciones
  pushMatrix();
  
  translate(tx, ty, 0);   // Traslación en forma de infinito
  rotateX(angleX);
  rotateY(angleY);
  scale(scaleFactor);

  fill(255, 200, 200);
  box(100);

  popMatrix();
}
