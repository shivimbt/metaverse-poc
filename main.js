import { CharacterController } from "./CharacterController";
import { KeyDisplay } from "./keydisplay";



//key display component
AFRAME.registerComponent('key-display', {

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
});


//movement controller component
AFRAME.registerComponent('movement-controller', {

  init: function () {
    // Do something when component first attached.
    const camera = document.querySelector('[camera]').getObject3D('camera');
    const orbitControl = document.querySelector('[orbit-controls]').components['orbit-controls'];
    const modelBoundingBox = document.querySelector('a-entity#character');
    this.el.addEventListener('model-loaded', e => {
      //set model property
      this.model = e.detail.model;
      //setup animation map
      const animations = this.model.animations;
      const mixer = new THREE.AnimationMixer(this.model);
      const animationMap = new Map();
      animations.filter(a => a.name != 'TPose').forEach((a) => animationMap.set(a.name, mixer.clipAction(a)));
      //instantiate character controller
      this.characterController = new CharacterController(this.model, modelBoundingBox, mixer, animationMap, camera, orbitControl, 'Idle');
    })
    this.keysPressed = {}
    document.addEventListener('keydown', event => {
      this.keysPressed[event.key.toLowerCase()] = true;
      

    }, false);

    document.addEventListener('keyup', event => {
      this.keysPressed[event.key.toLowerCase()] = false;
    }, false);
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
    this.characterController && this.characterController.update(timeDelta/1000, this.keysPressed)
  }
});


AFRAME.registerComponent("autofit-gltf-ammo-sphere", {

  init() {
    this.el.addEventListener("model-loaded", () => {
        
        this.el.setAttribute("ammo-body", "type:dynamic; angularFactor: 0 0 0; emitCollisionEvents: true; activationState: disableDeactivation");
        this.el.setAttribute("ammo-shape", "type:sphere; fit: manual; offset: 0 1 0; sphereRadius: 1");
    });
  }
});

AFRAME.registerComponent('friction-coefficient', {
  schema: {
    default: 0.8
  },

  init: function () {
    // Do something when component first attached.
    this.el.addEventListener("body-loaded", () => {
      this.el.body.setFriction(this.data);
    });
    
  },
});

document.addEventListener('click', e => {
  const el = e.target;
  if(el.classList.contains('avatar-selector')){
    const avatarId = el.getAttribute('data-src');
    const avatarEntity = document.querySelector('a-entity#character');
    avatarEntity.removeAttribute('gltf-model');
    avatarEntity.setAttribute('gltf-model', avatarId);
  }
})

