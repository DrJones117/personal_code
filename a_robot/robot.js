// List of places within the town of Meadowfield
const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin", 
    "Alice's House-Post Office", "Bob's House-Town Hall", 
    "Daria's House-Ernie's House", "Daria's House-Town Hall", 
    "Ernie's House-Grete's House", "Grete's House-Farm", 
    "Grete's House-Shop", "Marketplace-Farm", 
    "Marketplace-Post Office", "Marketplace-Shop", 
    "Marketplace-Town Hall", "Shop-Town Hall" 
];

// A function that maps the array of roads to an object so we can use it.
function buildGraph (edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to]
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);

// This is the "Village" so to speak and it has a function that lets the robot move and check of the address is correct in order to deliver the package.
class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}


let first = new VillageState(
    "Post Office", 
    [{place: "Post Office", address: "Alice's House"}]
);

let next = first.move("Alice's House");

console.log(next.place);