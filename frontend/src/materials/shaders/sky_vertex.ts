export default `
    precision highp float;
    // Attributes
    attribute vec3 position;
    // Uniforms
    uniform mat4 worldViewProjection;
    uniform mat4 world;
    // Varying
    varying vec3 vPositionW;


    void main() {

        vec4 p = vec4( position, 1. );
        vPositionW = vec3(world*p);

        gl_Position = worldViewProjection * p;

    }
`