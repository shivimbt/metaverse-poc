// export class CharacterController {
//     currentAction;
//     model;

//     constructor(model, currentAction){
//         this.currentAction = currentAction;
//         this.model = model;
//         model.setAttribute('animation-mixer', { clip: currentAction});
//     }

//     update(keysPressed, camera, rotateAngle, rotateQuarternion, walkDirection, cameraTarget){
//         const directionPressed = ['w','a','s','d'].some(key => keysPressed[key] === true);
//         var play = '';
//         if (directionPressed) {
//             play = 'Walking'
//         } else {
//             play = 'Idle'
//         }

//         if(this.currentAction != play){
//             this.currentAction = play;
//             this.model.setAttribute('animation-mixer', { clip: play, crossFadeDuration: 0.5})
//         }

//         if(this.currentAction == 'Walking') {
//             //calculate angle towards camera direction
//             var angleYCameraDirection = Math.atan2(
//                 (camera.position.x - this.model.object3D.position.x), 
//                 (camera.position.z - this.model.object3D.position.z));
            
//             var directionOffset = this.getDirectionOffset(keysPressed);

//             rotateQuarternion.setFromAxisAngle(rotateAngle, angleYCameraDirection + directionOffset)
//             this.model.object3D.quaternion.rotateTowards(rotateQuarternion, 0.2);

//             camera.getWorldDirection(walkDirection);
//             walkDirection.y = 0;
//             walkDirection.normalize();
//             walkDirection.applyAxisAngle(rotateAngle, directionOffset);

//             const moveX = walkDirection.x * 2 * 0.02;
//             const moveZ = walkDirection.z * 2 * 0.02;

//             this.model.object3D.position.x -= moveX;
//             this.model.object3D.position.z -= moveZ;
//             this.updateCameraTarget(moveX, moveZ, camera, cameraTarget, this.model.object3D);
//         }
//     }

//     getDirectionOffset = (keysPressed) => {
//         let directionOffset = 0 // w

//         if (keysPressed['w']) {
//             if (keysPressed['d']) {
//                 directionOffset = Math.PI / 4 + Math.PI / 2 // s+a
//             } else if (keysPressed['a']) {
//                 directionOffset = -Math.PI / 4 - Math.PI / 2 // s+d
//             } else {
//                 directionOffset = Math.PI // s
//             }
//         } else if (keysPressed['s']) {
//             if (keysPressed['d']) {
//                 directionOffset = Math.PI / 4 // w+a
//             } else if (keysPressed['a']) {
//                 directionOffset = - Math.PI / 4 // w+d
//             }
            
//         } else if (keysPressed['d']) {
//             directionOffset = Math.PI / 2 // a
//         } else if (keysPressed['a']) {
//             directionOffset = - Math.PI / 2 // d
//         }

//         return directionOffset;
//     }

//     updateCameraTarget(moveX, moveZ, camera, cameraTarget, model) {
//         // move camera
//         camera.position.x += moveX
//         camera.position.z += moveZ

//         // update camera target
//         cameraTarget.x = model.position.x
//         cameraTarget.y = model.position.y + 1
//         cameraTarget.z = model.position.z
//         //this.orbitControl.target = this.cameraTarget
//     }
// }