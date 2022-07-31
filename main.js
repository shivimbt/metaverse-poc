// import { CharacterController } from "./CharacterController";

import { KeyDisplay } from "./keydisplay";


// // const getDirectionOffset = (keysPressed) => {
// //   let directionOffset = 0 // w

// //   if (keysPressed['w']) {
// //       if (keysPressed['d']) {
// //           directionOffset = Math.PI / 4 + Math.PI / 2 // s+a
// //       } else if (keysPressed['a']) {
// //           directionOffset = -Math.PI / 4 - Math.PI / 2 // s+d
// //       } else {
// //           directionOffset = Math.PI // s
// //       }
// //   } else if (keysPressed['s']) {
// //       if (keysPressed['d']) {
// //           directionOffset = Math.PI / 4 // w+a
// //       } else if (keysPressed['a']) {
// //           directionOffset = - Math.PI / 4 // w+d
// //       }
     
// //   } else if (keysPressed['d']) {
// //       directionOffset = Math.PI / 2 // a
// //   } else if (keysPressed['a']) {
// //       directionOffset = - Math.PI / 2 // d
// //   }

// //   return directionOffset
// // }

// let rotateAngle = new THREE.Vector3(0, 1, 0);
// let rotateQuarternion = new THREE.Quaternion();
// let walkDirection = new THREE.Vector3()
// let cameraTarget = new THREE.Vector3()




// //initialize avatar
// const avatar = document.getElementById("character");

// //reference the camera
// const camera = document.getElementById('camera');
// const characterController = new CharacterController( avatar, 'Idle');


// //control keys
// const keysPressed = {};

// document.addEventListener('keydown', event => {
//   // keysPressed[event.key] = true;
//   // //set animation
//   // if(event.key === 'w'|| event.key === 'a' || event.key === 's' || event.key === 'd' ){

//   //      // calculate angle towards camera direction
//   //     const angleYCameraDirection = getAngleYCamerDirection(camera.getObject3D('camera').position, avatar.object3D.position);
//   //     // direction offset
//   //     const directionOffset = getDirectionOffset(keysPressed);
//   //     rotateQuarternion.setFromAxisAngle(rotateAngle, angleYCameraDirection + directionOffset);
//   //     avatar.object3D.quaternion.rotateTowards(rotateQuarternion, 0.2);

//   //     //avatar.setAttribute('animation-mixer', {clip: 'Walking', crossFadeDuration: '0.2'});
//   // }

//   keysPressed[event.key.toLowerCase()] = true;
//   characterController.update(keysPressed, camera.getObject3D('camera'), rotateAngle, rotateQuarternion, walkDirection, cameraTarget);

// }, false);

// document.addEventListener('keyup', event => {
//   // keysPressed[event.key] = false;
//   // //set animation
//   // avatar.setAttribute('animation-mixer', {clip: 'Idle', crossFadeDuration: '0.2'});
//   keysPressed[event.key.toLowerCase()] = false;
//   characterController.update(keysPressed, camera.getObject3D('camera'), rotateAngle, rotateQuarternion, walkDirection, cameraTarget);
// }, false);








// //character controller class





//key display component
AFRAME.registerComponent('key-display', {
  schema: {
  },

  init: function () {
    const keyMap = new Map();
    //instantiate display keys
    ['w', 'a', 's', 'd', 'shift'].forEach(keyText => keyMap.set(keyText, new KeyDisplay(keyText)));

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
  }
});


