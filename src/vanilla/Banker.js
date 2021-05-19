export class Process {
  constructor(resourceCount, allocated = [], max = []) {
    this.allocated = allocated;
    this.max = max;
    while(this.allocated.length < resourceCount) {
      this.allocated.push(0);
    }
    while(this.max.length < resourceCount) {
      this.max.push(0);
    }
    this.finish = false;
  }

  incrementAllocated(k) {
    let allocated = [...this.allocated];
    allocated[k]++;
    this.allocated = [...allocated];
  }

  decrementAllocated(k) {
    let allocated = [...this.allocated];
    if (allocated[k] > 0) {
      allocated[k]--;
      this.allocated = [...allocated];
    }
  }

  incrementMax(k) {
    let max = [...this.max];
    max[k]++;
    this.max = [...max];
  }

  decrementMax(k) {
    let max = [...this.max];
    if (max[k] > 0) {
      max[k]--;
      this.max = [...max];
    }
  }
  
  copy() {
    return new Process(this.allocated.length, [...this.allocated], [...this.max])
  }
  
  need() {
    let needVector = this.max.map((item, index) => item - this.allocated[index]);
    return needVector;
  }
  
  willItRunUsingResources(availableVector) {
    let needVector = this.need();
    for (let i=0; i < availableVector.length; i++) {
      if (needVector[i] > availableVector[i]) {
        return false;
      }
    }
    return true;
  }
  
  end() {
    this.finish = true;
  }
}
  
export class Banker {
  constructor(resourceCount) {
    this.processes = [];
    this.available = [];
    this.temporarilyAvailable = [];
    for (let i=0; i<resourceCount; i++){
      this.available.push(0);
    }
    this.temporarilyAvailable = [...this.available];
  }

  static fromString(input) {
    let i = 0;
    let data = input.split(',').map(i => parseInt(i));
    let resourceCount = data[i++];
    let newBanker = new Banker(resourceCount);
    let available = [];

    for (let j=0; j<resourceCount; j++) {
      available.push(data[i++]);
    }

    while (data[i] !== undefined) {
      let allocated = [];
      let max = [];
      for (let j=0; j<resourceCount; j++) {
        allocated.push(data[i++]);
      }
      for (let j=0; j<resourceCount; j++) {
        max.push(data[i++]);
      }
      newBanker.addProcess(new Process(resourceCount, allocated, max));
      newBanker.setAvailable(available);
    }
    return newBanker;
  }

  encode() {
    let data = [this.available.length, ...this.available];
    this.processes.forEach(process => {
      data = [...data, ...process.allocated, ...process.max];
    });
    return data.join(',');
  }
  
  addProcess(process) {
    this.processes = [...this.processes, process];
  }
  
  setAvailable(available) {
    this.available = [...available];
  }
  
  requestAdditionalResources(proccesIndex, inputResourceVector) {
    // Temporary vector to store original state
    let temporaryVector = [];
    let resourceVector = [...inputResourceVector];
    while(resourceVector.length < this.available.length) {
    	resourceVector.push(0);
    }

    // Commit the request
    try {
			let process = this.processes[proccesIndex];
      // console.log(`${JSON.stringify(process)} at ${proccesIndex} is requesting resources`);
			this.processes[proccesIndex].allocated = process.allocated.map((value, index) => {
        temporaryVector[index] = resourceVector[index];
        return (value + resourceVector[index]);
      });
			this.available = this.available.map((value, index) => {
        return (value - resourceVector[index]);
      });
    } catch (error) {
    	console.error('Invalid Index Provided to requestAdditionalResources');
      return;
    }

    // Check for system safety after commiting the request
    let safeResult = this.safe();

    // Append the request to the start of the safe result
    safeResult[1] = [`${proccesIndex}req` ,...safeResult[1]];

    // Restore original state
    temporaryVector.forEach((item, index) => {
      this.processes[proccesIndex].allocated[index] -= item;
      this.available[index] += item;
    });
    return safeResult;
  }
  
  safe() {
    let processSequence = [];
    let keepLooping = true;
    while(true) {
			if (!keepLooping) break;
			keepLooping = false;
			for (let i = 0; i < this.processes.length; i++) {
        let process = this.processes[i];
        let finish = process.finish;
        let willItRun = process.willItRunUsingResources(this.available);

        if (finish === false && willItRun) {
          this.getProcessResources(process);
          process.end();
          keepLooping = true;
          processSequence.push(i);
        }
			}
    }
    let allFinished = this.processes.every(process => process.finish)
    if (allFinished) {
      this.restoreTemporarilyAvailableResources();
      this.processes = this.processes.map(p => {
        p.finish = false;
        return p;
      });
			return [true, processSequence];
    }
    this.restoreTemporarilyAvailableResources();
    return [false, []];
  }

  restoreTemporarilyAvailableResources() {
    this.available = this.available.map((availableResourceCount, index) => (
      availableResourceCount - this.temporarilyAvailable[index]
    ));
    this.temporarilyAvailable = this.temporarilyAvailable.map(() => 0);
  }
  
  getProcessResources(process) {
    for (let i=0; i < process.allocated.length; i++) {
      this.available[i] += process.allocated[i];
      this.temporarilyAvailable[i] += process.allocated[i];
    }
  }

  getNeedMatrix() {
    let out = this.processes.map((process) => {
      return process.need();
    });
    return out;
  }
  
  print() {
    console.log(`Available:`, this.available);
    for (let i=0; i<this.processes.length; i++) {
      console.log(`Process ${i}: `, this.processes[i]);
    }
  }
}