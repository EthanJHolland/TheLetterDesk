import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';

import { ReadWriteService } from '../services/readwrite.service';

import 'rxjs/add/operator/filter';

@Component({
    selector: 'view-page',
    template: `<view-component
    [letter]=letter
    [preview]=preview>
    </view-component>
    `,
})
export class ViewPageComponent implements OnInit{
    letter: any;
    preview: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private readWriteService: ReadWriteService 
      ) {}
    

    isMobile(){
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
        console.log('is mobile?')
        console.log(check)
        return check;
    }

    ngOnInit(){
        this.isMobile();

        //note this can be navigated to either by /view/:id or /preview/:id
        //if the path starts with /preview set preview mode to true
        this.preview=this.router.url.startsWith('/preview')

        this.route.paramMap.subscribe((params: ParamMap) => {
            //get letter based on id
            this.readWriteService.retrieve(params.get('id'))
                .then((letter) => {
                    if(letter){
                        this.letter=letter;
                    }else{
                        //letter does not exist so redirect to compose page for now
                        //this.router.navigate(['/compose']);
                        this.letter={
                            "tldid" : "error", 
                            "location" : "letter not found", 
                            "order" : [
                                16, 
                                84, 
                                72, 
                                69, 
                                32, 
                                76, 
                                69, 
                                84, 
                                84, 
                                69, 
                                82, 
                                32, 
                                89, 
                                79, 
                                85, 
                                32, 
                                82, 
                                69, 
                                81, 
                                85, 
                                69, 
                                83, 
                                84, 
                                69, 
                                68, 
                                32, 
                                68, 
                                79, 
                                69, 
                                83, 
                                32, 
                                78, 
                                79, 
                                84, 
                                32, 
                                83, 
                                69, 
                                69, 
                                77, 
                                32, 
                                84, 
                                79, 
                                32, 
                                69, 
                                88, 
                                73, 
                                83, 
                                84, 
                                190, 
                                190, 
                                190
                            ], 
                            "down" : [
                                6197.3550000000005, 
                                6412.225, 
                                6538.110000000001, 
                                6651.285000000001, 
                                6779.76, 
                                6943.495000000001, 
                                7024.575000000001, 
                                7243.880000000001, 
                                7392.265000000001, 
                                7560.955000000001, 
                                7666.725, 
                                7818.295000000001, 
                                7995.360000000001, 
                                8066.650000000001, 
                                8177.205000000001, 
                                8391.900000000001, 
                                8513.865000000002, 
                                8676.415, 
                                8885.185, 
                                9057.160000000002, 
                                9156.61, 
                                9344.115, 
                                9524, 
                                9641.150000000001, 
                                9742.79, 
                                9882.155, 
                                10001.76, 
                                10106.645, 
                                10196.890000000001, 
                                10368.79, 
                                10496.485000000002, 
                                10647.37, 
                                10715.065, 
                                10772.575, 
                                10883.330000000002, 
                                11019.83, 
                                11205.795, 
                                11358.695000000002, 
                                11439.545, 
                                11592.650000000001, 
                                11686.010000000002, 
                                11757.405, 
                                11869.95, 
                                12026.845000000001, 
                                12267.625, 
                                12414.465000000002, 
                                12510.720000000001, 
                                12717.345000000001, 
                                13030.415, 
                                13250.720000000001, 
                                13490.470000000001
                            ], 
                            "duration" : [
                                0.258235, 
                                0.096489, 
                                0.100244, 
                                0.079805, 
                                0.073025, 
                                0.07793, 
                                0.089974, 
                                0.075394, 
                                0.080444, 
                                0.127139, 
                                0.089439, 
                                0.090009, 
                                0.069809, 
                                0.154345, 
                                0.077875, 
                                0.090434, 
                                0.066734, 
                                0.057265, 
                                0.113125, 
                                0.080769, 
                                0.067569, 
                                0.073475, 
                                0.052885, 
                                0.125764, 
                                0.089309, 
                                0.08659, 
                                0.08978, 
                                0.088689, 
                                0.076014, 
                                0.10213, 
                                0.069884, 
                                0.09825, 
                                0.081255, 
                                0.064345, 
                                0.087764, 
                                0.082595, 
                                0.060135, 
                                0.072024, 
                                0.064569, 
                                0.081264, 
                                0.065064, 
                                0.078489, 
                                0.08985, 
                                0.07061, 
                                0.093275, 
                                0.088824, 
                                0.10225, 
                                0.081835, 
                                0.089784, 
                                0.09726, 
                                0.105819
                            ], 
                            "times" : [
                                0, 
                                0.214869, 
                                0.340755, 
                                0.45393, 
                                0.582404, 
                                0.74614, 
                                0.82722, 
                                1.046525, 
                                1.19491, 
                                1.3636, 
                                1.46937, 
                                1.62094, 
                                1.798005, 
                                1.869295, 
                                1.97985, 
                                2.194545, 
                                2.31651, 
                                2.47906, 
                                2.687829, 
                                2.859805, 
                                2.959255, 
                                3.146759, 
                                3.326644, 
                                3.443795, 
                                3.545435, 
                                3.6848, 
                                3.804404, 
                                3.90929, 
                                3.999535, 
                                4.171435, 
                                4.29913, 
                                4.450015, 
                                4.51771, 
                                4.57522, 
                                4.685975, 
                                4.822474, 
                                5.00844, 
                                5.16134, 
                                5.24219, 
                                5.395295, 
                                5.488655, 
                                5.56005, 
                                5.672595, 
                                5.82949, 
                                6.070269, 
                                6.21711, 
                                6.313365, 
                                6.51999, 
                                6.83306, 
                                7.053365, 
                                7.293115
                            ]
                        }
                    }
                });
        });

    }
}