export default `
// Uniforms
uniform vec3 sunPosition; 
uniform vec3 cameraPosition;

// Varying
varying vec3 vPositionW;

// Constants
const vec3 up=vec3(0.0,1.0,0.0);
const float pi=3.141592653589793238462643383279502884197169;
const float sunAngularDiameterCos=0.999956676946448443553574619906976478926848692873900859324;

void main()
{
  vec3 sunDirection=normalize(sunPosition);
  float sunE=dot(sunDirection,up);
  vec3 camVertexDirection = normalize(vPositionW-cameraPosition);

  float cosTheta=dot(camVertexDirection,sunDirection);
  vec3 sky=vec3(0.203, 0.596, 0.858);
  vec3 sunColor = vec3(0.945, 0.921, 0.058);
  
  float sundisk=smoothstep(sunAngularDiameterCos-0.008,sunAngularDiameterCos+0.00002,cosTheta)*4.;
  float flare = smoothstep(sunAngularDiameterCos-0.1,sunAngularDiameterCos+0.1,cosTheta);
  sky += sunColor * sundisk - sky * sundisk + sky * flare;
  
  
  float horizon = 1. - smoothstep(-2.,1.,cosTheta);
  sky+= horizon;
  float bottom = step(0.9,cosTheta);
  sky = (1.-bottom)*min(sky,vec3(0.768, 0.905, 1.))+ bottom*sky;
  gl_FragColor=vec4(sky,1.0);

}
`