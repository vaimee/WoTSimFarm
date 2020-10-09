# WoT Farm Simulator
This project is a simple simulation of a digital farm. It can be used as a playground to understand how the Web Of Thing works.
[try it out](http://arces143100.arces.unibo.it/)!
![low poly 3D Farm](./imgs/3DFarm.png)

## RoadMap 
- Fronted:
    - [x] first rendering of the farm
    - [x] Modify the base 3d model of the farm to be more "usable"
    - [x] Skybox rendering
    - [x] connect fronted with the simulated web things
    - [ ] add animations
    - [ ] add a code editor to write user defined scripts
    - [ ] add interface for user private simulations
- Backend
    - [ ] Add unit tests
    - [X] Basic terrain simulation
    - [ ] Add a discovery service
    - [ ] Create user private simulations
    - [ ] save simulation state
    - [ ] Weather service
    - [ ] Advanced terrain simulation

## Terrain simulation

Currently, the terrain simulation is based on the `sech` function. The simulation modifies `sech` parameters to emulate watering and evaporation. Future development might involve a better spread on Z axis and the introduction of soil parameters.
Here it is a simple simulation of the soil water content after two irrigation events:

![simulation](./imgs/simulation.gif)

### Reference
[3D model](https://sketchfab.com/3d-models/low-poly-farm-v2-0e91a96ca6ee44569cf94972e30b5be4)