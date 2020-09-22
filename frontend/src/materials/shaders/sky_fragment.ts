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
  float sunE= max(0.,dot(sunDirection,up));
  vec3 camVertexDirection = normalize(vPositionW-cameraPosition);

  float cosTheta=dot(camVertexDirection,sunDirection);
  
  float day_night = abs(sunE);
  vec3 sky=vec3(0.203, 0.596, 0.858);
  vec3 sky_night = vec3(0.050, 0.250, 0.380);
  
  sky = (day_night)*sky + (1.-day_night)*sky_night;

  vec3 sunColor = vec3(0.945, 0.921, 0.058);
  
  float zenithAngle = acos(max(0.0, dot(up, normalize(vPositionW - cameraPosition))));
  
  float sundisk=smoothstep(sunAngularDiameterCos-0.008*sunE,sunAngularDiameterCos+0.00002,cosTheta)*4.;
  float flare = smoothstep(sunAngularDiameterCos-0.1 *sunE,sunAngularDiameterCos+0.1,cosTheta);
  
  sky += sunColor * sunE * sundisk - sky * sunE*sundisk + sunE*sky * flare;
 
  gl_FragColor=vec4(sky,1.0);

}
`