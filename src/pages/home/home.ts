import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {MQTTService} from '../../core/mqtt.service'
import {LoggerService} from '../../core/logger.service';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public isConnected: boolean = false;

    public sensor: any = {};
    public esp8266: any = {};

    public relay: any = {};

    constructor(public mqtt: MQTTService,
                public logger: LoggerService,
                public platform: Platform) {


        this.platform.pause.subscribe(() => {

            this.logger.log(`Receive event: pause`);
            this.mqtt.disconnect();
        });

        this.platform.resume.subscribe(() => {

            this.logger.log(`Receive event: resume`);
            this.mqtt.connect();
        });

        this.connect();
    }

    get relay1PowerOnModel() {

        return this.relay.powerOn ? this.relay.powerOn : false;
    }

    set relay1PowerOnModel(value) {

        this.relay.powerOn = value;
        
        this.mqtt.publish('/OsmarIME/lamp/1', value ? 'on' : 'off', {retain: true, qos: 2});
    }

    connect() {

        this.mqtt.connect(err => {
            if (err) return;

            this.logger.log(`connect: MQTT connected`);


            this.isConnected = true;



            console.log("SUB-entre-CERTO");


     

            this.mqtt.subscribe('/OsmarIME/lamp/1', (topic: string, powerOn: string) => {

                if (this.relay.powerOn !== (powerOn === 'on')) {

                    this.relay.powerOn = powerOn === 'on';
                };
                console.log("SUB-relay-CERTO");
            });
        });
    }

    disconnect() {

        this.mqtt.disconnect(err => {
            if (err) return;

            this.logger.log(`disconnect: MQTT disconnect`);

            this.isConnected = false;
        });
    }

}
