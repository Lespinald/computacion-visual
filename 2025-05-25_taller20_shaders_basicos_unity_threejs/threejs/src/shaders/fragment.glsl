precision highp float;

varying vec2 pos;

uniform vec2 screenSize;

void main() {
  
  // using the texture coordinate
  // vec2 position = pos;  
  
  // using the gl_FragCoord (normalised to 0-1)
  vec2 position = gl_FragCoord.xy / screenSize;
  
  gl_FragColor = vec4(position, 1., 1.);
  
}