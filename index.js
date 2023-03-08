// base Card class
class Card {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
}

// Unit class that inherits from Card
class Unit extends Card {
    constructor(name, cost, power, resilience) {
        super(name, cost);
        this.power = power;
        this.resilience = resilience;
    }

    attack(target) {
        // reduce target res by power

        // only run attack if target is an instance of the Unit class
        if (target instanceof Unit) {
            target.resilience -= this.power;
        } else {
            throw new Error("Unit.attack(): Target must be a unit!");
        }
    }
}

// Effect class that inherits from Card
class Effect extends Card {
    constructor(name, cost, stat, magnitude) {
        super(name, cost);
        this.stat = stat;
        this.magnitude = magnitude;

        // generate text based off of stat and magnitude
        this.text = this.formatText(stat, magnitude);
    }

    formatText(stat, magnitude) {
        // return a string for this.text based of stat and magnitude

        let direction;
        if (magnitude > 0) {
            direction = "increase";
        } else {
            direction = "reduce";
        }

        return `${direction} target's ${stat} by ${Math.abs(magnitude)}`;
    }

    play(target) {
        // only play an Effect if target is an instance of the Unit class
        if (target instanceof Unit) {
            if (this.stat === "resilience") {
                target.resilience += this.magnitude;
            } else {
                target.power += this.magnitude;
            }
        } else {
            throw new Error("Effect.play(): Target must be a unit!");
        }
    }
}

// make redBeltNinja
const redBeltNinja = new Unit("Red Belt Ninja", 3, 3, 4);

// makd blackBeltNinja
const blackBeltNinja = new Unit("Black Belt Ninja", 4, 5, 4);

// make hardAlgorithm and play on redBeltNinja
const hardAlgorithm = new Effect("Hard Algorithm", 2, "resilience", 3);
hardAlgorithm.play(redBeltNinja);

// make unhandledPromiseRejection and play on redBeltNinja
const unhandledPromiseRejection = new Effect(
    "Unhandled Promise Rejection",
    1,
    "resilience",
    -2
);
unhandledPromiseRejection.play(redBeltNinja);

// make pairProgramming and play it on redBeltNinja
const pairProgramming = new Effect("Pair Programming", 3, "power", 2);
pairProgramming.play(redBeltNinja);

// have redBeltNinja attack blackBeltNinja
redBeltNinja.attack(blackBeltNinja);

console.log(redBeltNinja);
console.log(blackBeltNinja);
console.log(hardAlgorithm);
