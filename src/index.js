import * as bootstrap from 'bootstrap';
import '@popperjs/core';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

import $ from 'jquery'


class App {
    latestTermData = [];
    caculatordData = {
        ssq: {
            name: "双色球",
            byname: "ssq",
            selectedNumber: {
                fushi: {
                    basic: [],
                    special: []
                },
                dantuo: {
                    danma: [],
                    special: [],
                    tuoma: []
                }
            }
        },
        kl8: {
            name: "快乐8",
            byname: "kl8",
            selectedNumber: {
                fushi: {
                    basic: [],
                    special: []
                },
                dantuo: {
                    danma: [],
                    special: [],
                    tuoma: []
                }
            }
        },
        qlc: {
            name: "七乐彩",
            byname: "qlc",
            selectedNumber: {
                fushi: {
                    basic: [],
                    special: []
                },
                dantuo: {
                    danma: [],
                    special: [],
                    tuoma: []
                }
            }
        },
    };

    constructor () {
        $.get('http://10.0.0.128/lottery/test/latest30/ssq', (data) => {
            this.latestTermData = data;
            
            for (let key in data) {
                let elSelect = $("#" + key + "-term-select");
                elSelect.empty();
                data[key].forEach((val, key) => {
                    $('<option>').prop({value: key, selected: key == 0 ? true : false}).text("第" + val.term + "期").appendTo(elSelect);
                })
                let selectedTermCode = elSelect.val();
                this.caculatordData[key].selectedTermCode = selectedTermCode;
                // $("#nav-" + key + " winNumber .red-ball")
                
            }
            this.init()
        }, 'JSON')
    }

    init() {        
        for (let key in this.latestTermData) {
            this.showWinNumber(key)
        }

        $('.number').on('click', (e) => {
            let gameName = e.target.getAttribute('data-game-name');
            let gameWays = e.target.getAttribute('data-game-ways');
            let numberType = e.target.getAttribute('data-number-type');
            let number = e.target.innerHTML;

            let numArr = this.caculatordData[gameName]['selectedNumber'][gameWays][numberType];
            if (numArr.includes(number)) {
                let newNums = [];
                // console.log(newNums);
                numArr.forEach((val) => {
                    // console.log((val != number), val, number)
                    if (val != number) {
                        newNums.push(val);
                    }
                })
                // console.log(newNums);
                this.caculatordData[gameName]['selectedNumber'][gameWays][numberType] = newNums;
            } else {
                this.caculatordData[gameName]['selectedNumber'][gameWays][numberType].push(number);
            }

            // console.log(this)
            // console.log(number, gameName, gameWays, numberType)
            $(e.target).toggleClass('active')
        })

        $('.term-select').on('change', (e) => {
            let termCodeKey = e.target.value;
            let game = e.target.getAttribute('name');
            this.caculatordData[game].selectedTermCode = termCodeKey;
            this.showWinNumber(game)
        })
    }

    showWinNumber(type) {
        let key = this.caculatordData[type].selectedTermCode;
        let selectedWinData = this.latestTermData[type][key];
        let basicBall = selectedWinData.red_ball.split(',')
        let specialBall = selectedWinData.blue_ball.split(',')
        
        basicBall.forEach((val, key) => {
            $("#nav-" + type + " .winNumber .red-ball").eq(key).html(val)
        })
        specialBall.forEach((val, key) => {
            $("#nav-" + type + " .winNumber .blue-ball").eq(key).html(val)
        })
        
    }

    getGameName() {
        let activeGame = $('#nav-games-tab .nav-link.active').attr('data-bs-target');
        return activeGame
    }

    getTermCode() {
        let termCode = $(this.gameName).find('.term-select').val()
        return termCode
    }

    getWinNumber() {
        let winNumber = {};
        let basicNumber = [];
        let specialNumber = [];

        $(this.gameName).find('.winNumber .ball').each((key, value) => {
            let num = $(value).text();
            if ($(value).hasClass('blue-ball')) {
                specialNumber.push(num)
            } else {
                basicNumber.push(num);
            }
        })

        winNumber.basicNumber = basicNumber;
        winNumber.specialNumber = specialNumber;
        return winNumber;
    }

    getGameWays() {
        let gameWays = $(this.gameName).find('.nav-tzfs .nav-link.active').attr('data-bs-target')
        return gameWays
    }


}

const app = new App();

// const app = {
//     games: [{
//         byname: 'ssq',
//         name: '双色球',
//     }],
//     start: () => {
//         $('.number').on('click', (e) => {
//             console.log(this)
//         })
//     },
//     numClick: () => {
//         console.log(arguments)
//     },
//     getGameName: () => {

//     },
//     getTermData: () => {

//     }
// }

// app.start()