import { CharacterController } from "./CharacterController";


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


//click listener
document.addEventListener('click', e => {
  const el = e.target;
  if(el.classList.contains('avatar-selector')){
    const avatarId = el.getAttribute('data-src');
    const avatarEntity = document.querySelector('a-entity#character');
    avatarEntity.removeAttribute('gltf-model');
    avatarEntity.setAttribute('gltf-model', avatarId);
    //enable the proceed button
    document.getElementById('proceed').classList.remove('hide');
  }
});

//proceed button click listener
document.getElementById('proceed').addEventListener('click', e=> {
  document.getElementById('selector-container').classList.add('hide');
})

