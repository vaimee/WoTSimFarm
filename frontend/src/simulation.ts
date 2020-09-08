async function discover() {
    const response = await fetch("http://localhost:8000/")
    let things = await response.json()
    let thingsIds: any = {}
    
    things = things.filter((thingAddr: string) => {
        const url = new URL(thingAddr)
        const thingId: string = url.pathname
        if (!thingsIds[thingId] && (thingId.includes("SoilSensor") || thingId.includes("Sprinkler"))) {
            thingsIds[thingId] = true;
            return true;
        }
        return false;

    })
    
    return things;
}
export default () => {
    var servient = new Wot.Core.Servient({ clientOnly: true });
    servient.addClientFactory(new Wot.Http.HttpClientFactory());
    var helpers = new Wot.Core.Helpers(servient);

    servient.start().then(async (runtime: any) => {
        
        const things = await discover();
        console.log(things)
    })
}



