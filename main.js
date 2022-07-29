const getAngleYCamerDirection = (cameraPosition, avatarPosition) => {
  return Math.atan2((cameraPosition.x - avatarPosition.x),(cameraPosition.z - avatarPosition.z));
}

const getDirectionOffset = (keysPressed) => {
  let directionOffset = 0 // w

  if (keysPressed['w']) {
      if (keysPressed['d']) {
          directionOffset = Math.PI / 4 + Math.PI / 2 // s+a
      } else if (keysPressed['a']) {
          directionOffset = -Math.PI / 4 - Math.PI / 2 // s+d
      } else {
          directionOffset = Math.PI // s
      }
  } else if (keysPressed['s']) {
      if (keysPressed['d']) {
          directionOffset = Math.PI / 4 // w+a
      } else if (keysPressed['a']) {
          directionOffset = - Math.PI / 4 // w+d
      }
     
  } else if (keysPressed['d']) {
      directionOffset = Math.PI / 2 // a
  } else if (keysPressed['a']) {
      directionOffset = - Math.PI / 2 // d
  }

  return directionOffset
}

let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuarternion = new THREE.Quaternion();






//initialize avatar with a idle pose
const avatar = document.getElementById("character");
avatar.setAttribute('animation-mixer', {clip: 'Idle'});

//reference the camera
const camera = document.getElementById('camera');

//maintain keys pressed at a given time
const keysPressed = {};

//Event Listener for key pressed
document.addEventListener('keydown', event => {
  keysPressed[event.key] = true;
  //set animation
  if(event.key === 'w'|| event.key === 'a' || event.key === 's' || event.key === 'd' ){

       // calculate angle towards camera direction
      const angleYCameraDirection = getAngleYCamerDirection(camera.getObject3D('camera').position, avatar.object3D.position);
      // direction offset
      const directionOffset = getDirectionOffset(keysPressed);
      rotateQuarternion.setFromAxisAngle(rotateAngle, angleYCameraDirection + directionOffset);
      avatar.object3D.quaternion.rotateTowards(rotateQuarternion, 0.2);

      avatar.setAttribute('animation-mixer', {clip: 'Walking', crossFadeDuration: '0.2'});
  }
  
});

//Event Listener for key not pressed
document.addEventListener('keyup', event => {
  keysPressed[event.key] = false;
  //set animation
  avatar.setAttribute('animation-mixer', {clip: 'Idle'})
})








//character controller class
