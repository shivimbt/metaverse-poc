import { CharacterController } from "./CharacterController";
import { KeyDisplay } from "./keydisplay";


//key display component
AFRAME.registerComponent('key-display', {
  schema: {
  },

  init: function () {
    const keyMap = new Map();
    //instantiate display keys
    KeyDisplay.directions.forEach(keyText => keyMap.set(keyText, new KeyDisplay(keyText)));
    keyMap.set(KeyDisplay.shift, new KeyDisplay(KeyDisplay.shift));

    //add keyup and keydown handlers
    document.addEventListener('keydown', event => {
      const keyPressed = keyMap.get(event.key.toLowerCase());
      if(keyPressed){
        keyPressed.down();
      }
    });
    document.addEventListener('keyup', event => {
      const keyLeft = keyMap.get(event.key.toLowerCase());
      if(keyLeft){
        keyLeft.up();
      }
    });
  },

  update: function () {
    // Do something when component's data is updated.
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  }
});


//movement controller component
AFRAME.registerComponent('movement-controller', {
  schema: {
    
  },

  init: function () {
    // Do something when component first attached.
    const camera = document.querySelector('[camera]').getObject3D('camera');
    const orbitControl = document.querySelector('[orbit-controls]').components['orbit-controls'];
    this.el.addEventListener('model-loaded', e => {
      //set model property
      this.model = e.detail.model;
      //setup animation map
      const animations = this.model.animations;
      const mixer = new THREE.AnimationMixer(this.model);
      const animationMap = new Map();
      animations.filter(a => a.name != 'TPose').forEach((a) => animationMap.set(a.name, mixer.clipAction(a)));
      //instantiate character controller
      this.characterController = new CharacterController(this.model, mixer, animationMap, camera, orbitControl, 'Idle');
    })
    this.keysPressed = {}
    document.addEventListener('keydown', event => {
      this.keysPressed[event.key.toLowerCase()] = true;
      

    }, false);

    document.addEventListener('keyup', event => {
      this.keysPressed[event.key.toLowerCase()] = false;
    }, false);
  },

  update: function () {
    // Do something when component's data is updated.
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
    this.characterController && this.characterController.update(timeDelta/1000, this.keysPressed)
  }
});


