// This is the "Village" so to speak, and it simulates a delivery robot moving 
// between locations to deliver parcels to their destinations.

class VillageState {
    constructor(place, parcels) {
        this.place = place; // Current location of the robot
        this.parcels = parcels; // List of parcels with current and destination locations
    }

    // This method moves the robot to a new location if it's connected by a road.
    // It also updates the parcels' locations and filters out delivered parcels.
    move(destination) {
        // If the destination isn't directly reachable, return the same state.
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            // Update parcels: Move parcels at the current location to the destination.
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p; // Keep parcels not at the current location
                return { place: destination, address: p.address }; // Update parcel location
            }).filter(p => p.place != p.address); // Remove parcels that reached their destination
            
            // Return a new state reflecting the move and updated parcels.
            return new VillageState(destination, parcels);
        }
    }
}

// List of roads connecting locations within the town of Meadowfield
const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin", 
    "Alice's House-Post Office", "Bob's House-Town Hall", 
    "Daria's House-Ernie's House", "Daria's House-Town Hall", 
    "Ernie's House-Grete's House", "Grete's House-Farm", 
    "Grete's House-Shop", "Marketplace-Farm", 
    "Marketplace-Post Office", "Marketplace-Shop", 
    "Marketplace-Town Hall", "Shop-Town Hall" 
];

// Converts an array of roads into a graph object for easy lookup of connections
function buildGraph(edges) {
    let graph = Object.create(null); // Create an empty graph object

    // Adds a connection between two locations
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to]; // Initialize a new array if none exists
        } else {
            graph[from].push(to); // Add the connection to the existing array
        }
    }

    // Split each road into two connected locations and add both directions to the graph
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph; // Return the constructed graph
}

const roadGraph = buildGraph(roads); // Build the graph from the roads array

// This simulates the robot's operation; it runs until all parcels are delivered.
function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        // If no parcels are left, the robot is done.
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns!`);
            break;
        }
        // Get the robot's next move and update the state and memory accordingly
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

// Selects a random element from an array
function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length); // Pick a random index
    return array[choice];
}

// A robot that moves randomly between connected locations
function randomRobot(state) {
    return { direction: randomPick(roadGraph[state.place]) }; // Choose a random direction
}

// Creates a random initial state with a specified number of parcels
VillageState.random = function(parcelCount = 5) {
    let parcels = []; // Initialize an empty array of parcels
    for (let i = 0; i < parcelCount; i++) {
        // Pick a random delivery address
        let address = randomPick(Object.keys(roadGraph));
        let place;
        // Ensure the parcel doesn't start at its destination
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({ place, address }); // Add the parcel to the list
    }
    // The robot always starts at the Post Office
    return new VillageState("Post Office", parcels);
};

runRobot(VillageState.random(),randomRobot);