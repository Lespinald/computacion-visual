attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec2 pos;

void main() {
  pos = aTexCoord;

  // We're actually respecting the quads positions
  vec4 position = vec4(aPosition, 1.0);
  
  position = uProjectionMatrix * uModelViewMatrix * position;
  
  gl_Position = position;
}