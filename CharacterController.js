import { KeyDisplay } from "./keydisplay";

export class CharacterController {
    model;
    boundingBox;
    mixer;
    orbitControl;
    animationMap;
    camera;

    //state
    currentAction;

    //temporaryData
    walkDirection = new THREE.Vector3();
    rotateAngle = new THREE.Vector3(0, 1, 0);
    rotateQuarternion = new THREE.Quaternion();
    cameraTarget = new THREE.Vector3();

    modelDirection = new THREE.Vector3();

    // constants
    fadeDuration = 0.2;
    runVelocity = 5;
    walkVelocity = 2;

    constructor(model, boundingBox, mixer, animationMap, camera, orbitControl, currentAction){
        this.model = model;
        this.boundingBox = boundingBox;
        this.mixer = mixer;
        this.animationMap = animationMap;
        this.camera = camera;
        this.orbitControl = orbitControl;
        this.currentAction = currentAction;

        this.animationMap.forEach((value, key) => {
            if (key == currentAction) {
                value.play();
            }
        })
    }

    update(delta, keysPressed) {
        const directionPressed = KeyDisplay.directions.some(key => keysPressed[key] == true);
        const isShiftPressed = keysPressed[KeyDisplay.shift];
        //simple state machine
        var play = '';
        if (directionPressed && isShiftPressed) {
            play = 'Running';
        } else if (directionPressed) {
            play = 'Walking';
        } else {
            play = 'Idle';
        }

        if (this.currentAction != play) {
            const toPlay = this.animationMap.get(play);
            const current = this.animationMap.get(this.currentAction);

            current.fadeOut(this.fadeDuration);
            toPlay.reset().fadeIn(this.fadeDuration).play();

            this.currentAction = play;
        }

        this.mixer.update(delta);

        if(this.currentAction == 'Running' || this.currentAction == 'Walking') {
            //get the standard wasd based angle offset
            var directionOffset = this.#directionOffset(keysPressed);

            //get the current angle between model and camera
            const angleBetweenModelAndCamera = Math.atan2(
                (this.camera.position.x - this.boundingBox.object3D.position.x), 
                (this.camera.position.z - this.boundingBox.object3D.position.z))


            // rotate model to face where the camera is looking at and also apply the wasd based angle
            this.rotateQuarternion.setFromAxisAngle(this.rotateAngle, directionOffset + angleBetweenModelAndCamera);
            this.model.quaternion.rotateTowards(this.rotateQuarternion, 0.2);

            // calculate direction vector for choosing which way to translate
            this.camera.getWorldDirection(this.walkDirection);
            this.walkDirection.y = 0;
            this.walkDirection.normalize();
            this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset);

            // run/walk velocity
            const velocity = this.currentAction == 'Running' ? this.runVelocity : this.walkVelocity;
            // move model & camera
            const velocityX = this.walkDirection.x * velocity;
            const velocityY = this.walkDirection.z * velocity; 
            const moveX = velocityX * delta;
            const moveZ = velocityY * delta;

            //model movement
            const velocityForPhysicsBody = new Ammo.btVector3(velocityX, 0, velocityY);
            this.boundingBox.body.setLinearVelocity(velocityForPhysicsBody);
            Ammo.destroy(velocityForPhysicsBody);

            this.camera.position.z += moveZ;
            this.camera.position.x += moveX;
            this.orbitControl.target.set(this.boundingBox.object3D.position.x, this.boundingBox.object3D.position.y + 1, this.boundingBox.object3D.position.z);

            

        }
        
    }


    #directionOffset(keysPressed) {
        var directionOffset = 0; // w

        if (keysPressed['w']) {
            if (keysPressed['a']) {
                directionOffset = Math.PI / 4; // w+a
            } else if (keysPressed['d']) {
                directionOffset = - Math.PI / 4; // w+d
            }
        } else if (keysPressed['s']) {
            if (keysPressed['a']) {
                directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
            } else if (keysPressed['d']) {
                directionOffset = - Math.PI / 4 - Math.PI / 2; // s+d
            } else {
                directionOffset = Math.PI; // s
            }
        } else if (keysPressed['a']) {
            directionOffset = Math.PI / 2; // a
        } else if (keysPressed['d']) {
            directionOffset = - Math.PI / 2; // d
        }

        return directionOffset;
    }
}