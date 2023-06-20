import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HelperService {
  constructor(private prisma: PrismaService) {}
  async pricingUpload() {
    for (const x of this.getPricingData()) {
      const rec = {
        pricing_class: x.pricing_class,
        min_pricing:
          x.min_pricing
            .split('')
            .filter((e) => e !== '$')
            .join('') || null,
        normal_pricing:
          x.normal_pricing
            .split('')
            .filter((e) => e !== '$')
            .join('') || null,
        max_pricing:
          x.max_pricing
            .split('')
            .filter((e) => e !== '$')
            .join('') || null,
      };
      await this.prisma.pricing.create({
        data: rec,
      });
    }
    return { message: 'Pricing Uploaded' };
  }

  async seatUpload() {
    const hmap = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      E: 5,
      F: 6,
      G: 7,
      H: 8,
      I: 9,
      J: 10,
    };
    for (const x of this.getSeatData()) {
      const rec = {
        id: x.id,
        seat_number: x.seat_identifier,
        pricingId: hmap[x.seat_class],
      };
      await this.prisma.seat.create({ data: rec });
    }

    return { message: 'Seats Uploaded' };
  }

  async getSeatPricing({
    seat_pricing_id,
    min_price,
    normal_price,
    max_price,
  }) {
    const no_of_seats = await this.prisma.seat.count({
      where: {
        pricingId: seat_pricing_id,
      },
    });
    const no_of_booked_seats = await this.prisma.seat.count({
      where: {
        pricingId: seat_pricing_id,
        bookingId: {
          not: null,
        },
      },
    });
    const percent_booked = (no_of_booked_seats / no_of_seats) * 100;

    if (percent_booked < 40) {
      return min_price || normal_price;
    } else if (percent_booked < 60) {
      return normal_price || max_price;
    } else {
      return max_price || normal_price;
    }
  }

  getPricingData() {
    return [
      {
        id: 1,
        pricing_class: 'A',
        min_pricing: '',
        normal_pricing: '$397.61',
        max_pricing: '$547.20',
      },
      {
        id: 2,
        pricing_class: 'B',
        min_pricing: '$183.44',
        normal_pricing: '$441.65',
        max_pricing: '$766.96',
      },
      {
        id: 3,
        pricing_class: 'C',
        min_pricing: '$158.47',
        normal_pricing: '$449.40',
        max_pricing: '$678.55',
      },
      {
        id: 4,
        pricing_class: 'D',
        min_pricing: '$156.15',
        normal_pricing: '$263.73',
        max_pricing: '',
      },
      {
        id: 5,
        pricing_class: 'E',
        min_pricing: '',
        normal_pricing: '$274.52',
        max_pricing: '$795.68',
      },
      {
        id: 6,
        pricing_class: 'F',
        min_pricing: '',
        normal_pricing: '$459.66',
        max_pricing: '$694.75',
      },
      {
        id: 7,
        pricing_class: 'G',
        min_pricing: '',
        normal_pricing: '$296.21',
        max_pricing: '',
      },
      {
        id: 8,
        pricing_class: 'H',
        min_pricing: '',
        normal_pricing: '$477.06',
        max_pricing: '',
      },
      {
        id: 9,
        pricing_class: 'I',
        min_pricing: '',
        normal_pricing: '$451.84',
        max_pricing: '$762.14',
      },
      {
        id: 10,
        pricing_class: 'J',
        min_pricing: '',
        normal_pricing: '$406.24',
        max_pricing: '$868.71',
      },
    ];
  }
  getSeatData() {
    return [
      {
        id: 1,
        seat_identifier: '654059941-2',
        seat_class: 'H',
      },
      {
        id: 2,
        seat_identifier: '186150079-3',
        seat_class: 'E',
      },
      {
        id: 3,
        seat_identifier: '554266047-9',
        seat_class: 'G',
      },
      {
        id: 4,
        seat_identifier: '955883445-9',
        seat_class: 'G',
      },
      {
        id: 5,
        seat_identifier: '113273476-2',
        seat_class: 'G',
      },
      {
        id: 6,
        seat_identifier: '006890170-4',
        seat_class: 'B',
      },
      {
        id: 7,
        seat_identifier: '296284124-4',
        seat_class: 'I',
      },
      {
        id: 8,
        seat_identifier: '372259832-X',
        seat_class: 'C',
      },
      {
        id: 9,
        seat_identifier: '029228116-1',
        seat_class: 'I',
      },
      {
        id: 10,
        seat_identifier: '292549467-6',
        seat_class: 'J',
      },
      {
        id: 11,
        seat_identifier: '726092574-4',
        seat_class: 'D',
      },
      {
        id: 12,
        seat_identifier: '704770716-6',
        seat_class: 'A',
      },
      {
        id: 13,
        seat_identifier: '616679240-9',
        seat_class: 'E',
      },
      {
        id: 14,
        seat_identifier: '488073276-1',
        seat_class: 'G',
      },
      {
        id: 15,
        seat_identifier: '925856496-0',
        seat_class: 'F',
      },
      {
        id: 16,
        seat_identifier: '607894352-9',
        seat_class: 'D',
      },
      {
        id: 17,
        seat_identifier: '047828406-3',
        seat_class: 'J',
      },
      {
        id: 18,
        seat_identifier: '202665431-X',
        seat_class: 'J',
      },
      {
        id: 19,
        seat_identifier: '784103793-7',
        seat_class: 'E',
      },
      {
        id: 20,
        seat_identifier: '535457886-8',
        seat_class: 'I',
      },
      {
        id: 21,
        seat_identifier: '999153534-9',
        seat_class: 'H',
      },
      {
        id: 22,
        seat_identifier: '603962325-X',
        seat_class: 'C',
      },
      {
        id: 23,
        seat_identifier: '671176466-8',
        seat_class: 'H',
      },
      {
        id: 24,
        seat_identifier: '635323715-4',
        seat_class: 'C',
      },
      {
        id: 25,
        seat_identifier: '926184936-9',
        seat_class: 'B',
      },
      {
        id: 26,
        seat_identifier: '497402750-6',
        seat_class: 'F',
      },
      {
        id: 27,
        seat_identifier: '544053582-9',
        seat_class: 'H',
      },
      {
        id: 28,
        seat_identifier: '467904863-8',
        seat_class: 'D',
      },
      {
        id: 29,
        seat_identifier: '597507461-4',
        seat_class: 'G',
      },
      {
        id: 30,
        seat_identifier: '767276921-9',
        seat_class: 'J',
      },
      {
        id: 31,
        seat_identifier: '132807839-6',
        seat_class: 'C',
      },
      {
        id: 32,
        seat_identifier: '811935636-5',
        seat_class: 'B',
      },
      {
        id: 33,
        seat_identifier: '657293145-5',
        seat_class: 'G',
      },
      {
        id: 34,
        seat_identifier: '540893227-3',
        seat_class: 'F',
      },
      {
        id: 35,
        seat_identifier: '575065058-8',
        seat_class: 'J',
      },
      {
        id: 36,
        seat_identifier: '871034850-6',
        seat_class: 'A',
      },
      {
        id: 37,
        seat_identifier: '589262175-8',
        seat_class: 'B',
      },
      {
        id: 38,
        seat_identifier: '535325062-1',
        seat_class: 'E',
      },
      {
        id: 39,
        seat_identifier: '062857362-6',
        seat_class: 'C',
      },
      {
        id: 40,
        seat_identifier: '332579490-4',
        seat_class: 'A',
      },
      {
        id: 41,
        seat_identifier: '262684304-0',
        seat_class: 'E',
      },
      {
        id: 42,
        seat_identifier: '218740820-5',
        seat_class: 'J',
      },
      {
        id: 43,
        seat_identifier: '270197201-9',
        seat_class: 'C',
      },
      {
        id: 44,
        seat_identifier: '473596428-2',
        seat_class: 'I',
      },
      {
        id: 45,
        seat_identifier: '109449074-1',
        seat_class: 'J',
      },
      {
        id: 46,
        seat_identifier: '555711713-X',
        seat_class: 'J',
      },
      {
        id: 47,
        seat_identifier: '707416818-1',
        seat_class: 'D',
      },
      {
        id: 48,
        seat_identifier: '270663583-5',
        seat_class: 'I',
      },
      {
        id: 49,
        seat_identifier: '844777210-1',
        seat_class: 'A',
      },
      {
        id: 50,
        seat_identifier: '181964461-8',
        seat_class: 'F',
      },
      {
        id: 51,
        seat_identifier: '232869050-5',
        seat_class: 'F',
      },
      {
        id: 52,
        seat_identifier: '377239121-4',
        seat_class: 'J',
      },
      {
        id: 53,
        seat_identifier: '654043242-9',
        seat_class: 'C',
      },
      {
        id: 54,
        seat_identifier: '652618477-4',
        seat_class: 'G',
      },
      {
        id: 55,
        seat_identifier: '180123257-1',
        seat_class: 'H',
      },
      {
        id: 56,
        seat_identifier: '862980129-8',
        seat_class: 'H',
      },
      {
        id: 57,
        seat_identifier: '567288002-9',
        seat_class: 'A',
      },
      {
        id: 58,
        seat_identifier: '365003459-X',
        seat_class: 'B',
      },
      {
        id: 59,
        seat_identifier: '527693692-7',
        seat_class: 'H',
      },
      {
        id: 60,
        seat_identifier: '252131729-2',
        seat_class: 'C',
      },
      {
        id: 61,
        seat_identifier: '459798718-5',
        seat_class: 'B',
      },
      {
        id: 62,
        seat_identifier: '318327500-7',
        seat_class: 'C',
      },
      {
        id: 63,
        seat_identifier: '003597896-1',
        seat_class: 'G',
      },
      {
        id: 64,
        seat_identifier: '608629041-5',
        seat_class: 'B',
      },
      {
        id: 65,
        seat_identifier: '774324583-7',
        seat_class: 'A',
      },
      {
        id: 66,
        seat_identifier: '803025248-X',
        seat_class: 'A',
      },
      {
        id: 67,
        seat_identifier: '058306561-9',
        seat_class: 'B',
      },
      {
        id: 68,
        seat_identifier: '620767856-7',
        seat_class: 'E',
      },
      {
        id: 69,
        seat_identifier: '174541201-8',
        seat_class: 'B',
      },
      {
        id: 70,
        seat_identifier: '658021204-7',
        seat_class: 'F',
      },
      {
        id: 71,
        seat_identifier: '645838826-8',
        seat_class: 'J',
      },
      {
        id: 72,
        seat_identifier: '799611074-3',
        seat_class: 'F',
      },
      {
        id: 73,
        seat_identifier: '249634692-1',
        seat_class: 'A',
      },
      {
        id: 74,
        seat_identifier: '838015980-2',
        seat_class: 'A',
      },
      {
        id: 75,
        seat_identifier: '569192679-9',
        seat_class: 'E',
      },
      {
        id: 76,
        seat_identifier: '691507211-X',
        seat_class: 'I',
      },
      {
        id: 77,
        seat_identifier: '572075570-5',
        seat_class: 'H',
      },
      {
        id: 78,
        seat_identifier: '659111050-X',
        seat_class: 'H',
      },
      {
        id: 79,
        seat_identifier: '672483295-0',
        seat_class: 'I',
      },
      {
        id: 80,
        seat_identifier: '450551720-9',
        seat_class: 'A',
      },
      {
        id: 81,
        seat_identifier: '958035325-5',
        seat_class: 'B',
      },
      {
        id: 82,
        seat_identifier: '107261389-1',
        seat_class: 'F',
      },
      {
        id: 83,
        seat_identifier: '047713443-2',
        seat_class: 'C',
      },
      {
        id: 84,
        seat_identifier: '970856448-6',
        seat_class: 'H',
      },
      {
        id: 85,
        seat_identifier: '158201579-1',
        seat_class: 'F',
      },
      {
        id: 86,
        seat_identifier: '138953075-2',
        seat_class: 'D',
      },
      {
        id: 87,
        seat_identifier: '161712497-4',
        seat_class: 'B',
      },
      {
        id: 88,
        seat_identifier: '921466765-9',
        seat_class: 'C',
      },
      {
        id: 89,
        seat_identifier: '556366724-3',
        seat_class: 'I',
      },
      {
        id: 90,
        seat_identifier: '717289988-1',
        seat_class: 'E',
      },
      {
        id: 91,
        seat_identifier: '360867949-9',
        seat_class: 'H',
      },
      {
        id: 92,
        seat_identifier: '627233063-4',
        seat_class: 'F',
      },
      {
        id: 93,
        seat_identifier: '101939708-X',
        seat_class: 'B',
      },
      {
        id: 94,
        seat_identifier: '989796566-1',
        seat_class: 'D',
      },
      {
        id: 95,
        seat_identifier: '829880560-7',
        seat_class: 'J',
      },
      {
        id: 96,
        seat_identifier: '898865785-3',
        seat_class: 'A',
      },
      {
        id: 97,
        seat_identifier: '292774461-0',
        seat_class: 'A',
      },
      {
        id: 98,
        seat_identifier: '072116571-0',
        seat_class: 'E',
      },
      {
        id: 99,
        seat_identifier: '409857046-7',
        seat_class: 'J',
      },
      {
        id: 100,
        seat_identifier: '287531899-3',
        seat_class: 'H',
      },
      {
        id: 101,
        seat_identifier: '558040867-6',
        seat_class: 'G',
      },
      {
        id: 102,
        seat_identifier: '584672144-3',
        seat_class: 'H',
      },
      {
        id: 103,
        seat_identifier: '574191539-6',
        seat_class: 'A',
      },
      {
        id: 104,
        seat_identifier: '984949512-X',
        seat_class: 'C',
      },
      {
        id: 105,
        seat_identifier: '947899984-2',
        seat_class: 'H',
      },
      {
        id: 106,
        seat_identifier: '743988488-4',
        seat_class: 'C',
      },
      {
        id: 107,
        seat_identifier: '095910854-8',
        seat_class: 'H',
      },
      {
        id: 108,
        seat_identifier: '943990109-8',
        seat_class: 'A',
      },
      {
        id: 109,
        seat_identifier: '580270804-2',
        seat_class: 'A',
      },
      {
        id: 110,
        seat_identifier: '505978634-X',
        seat_class: 'E',
      },
      {
        id: 111,
        seat_identifier: '891698811-X',
        seat_class: 'H',
      },
      {
        id: 112,
        seat_identifier: '649570228-0',
        seat_class: 'E',
      },
      {
        id: 113,
        seat_identifier: '801672416-7',
        seat_class: 'G',
      },
      {
        id: 114,
        seat_identifier: '742154010-5',
        seat_class: 'F',
      },
      {
        id: 115,
        seat_identifier: '166428997-6',
        seat_class: 'A',
      },
      {
        id: 116,
        seat_identifier: '869585632-1',
        seat_class: 'C',
      },
      {
        id: 117,
        seat_identifier: '047537549-1',
        seat_class: 'A',
      },
      {
        id: 118,
        seat_identifier: '448678190-2',
        seat_class: 'D',
      },
      {
        id: 119,
        seat_identifier: '470787892-X',
        seat_class: 'C',
      },
      {
        id: 120,
        seat_identifier: '238221952-1',
        seat_class: 'J',
      },
      {
        id: 121,
        seat_identifier: '195280412-4',
        seat_class: 'I',
      },
      {
        id: 122,
        seat_identifier: '088723923-4',
        seat_class: 'D',
      },
      {
        id: 123,
        seat_identifier: '731691895-0',
        seat_class: 'A',
      },
      {
        id: 124,
        seat_identifier: '999251907-X',
        seat_class: 'F',
      },
      {
        id: 125,
        seat_identifier: '476879776-8',
        seat_class: 'J',
      },
      {
        id: 126,
        seat_identifier: '123565862-7',
        seat_class: 'A',
      },
      {
        id: 127,
        seat_identifier: '260468656-2',
        seat_class: 'B',
      },
      {
        id: 128,
        seat_identifier: '541381954-4',
        seat_class: 'C',
      },
      {
        id: 129,
        seat_identifier: '908965651-0',
        seat_class: 'J',
      },
      {
        id: 130,
        seat_identifier: '262370733-2',
        seat_class: 'D',
      },
      {
        id: 131,
        seat_identifier: '616226116-6',
        seat_class: 'G',
      },
      {
        id: 132,
        seat_identifier: '369482172-4',
        seat_class: 'A',
      },
      {
        id: 133,
        seat_identifier: '007686235-6',
        seat_class: 'F',
      },
      {
        id: 134,
        seat_identifier: '624576843-8',
        seat_class: 'G',
      },
      {
        id: 135,
        seat_identifier: '845805154-0',
        seat_class: 'B',
      },
      {
        id: 136,
        seat_identifier: '869108136-8',
        seat_class: 'H',
      },
      {
        id: 137,
        seat_identifier: '588548471-6',
        seat_class: 'G',
      },
      {
        id: 138,
        seat_identifier: '063369177-1',
        seat_class: 'C',
      },
      {
        id: 139,
        seat_identifier: '472126937-4',
        seat_class: 'A',
      },
      {
        id: 140,
        seat_identifier: '974996658-9',
        seat_class: 'A',
      },
      {
        id: 141,
        seat_identifier: '420950472-6',
        seat_class: 'C',
      },
      {
        id: 142,
        seat_identifier: '053844807-5',
        seat_class: 'C',
      },
      {
        id: 143,
        seat_identifier: '109253618-3',
        seat_class: 'J',
      },
      {
        id: 144,
        seat_identifier: '947102097-2',
        seat_class: 'D',
      },
      {
        id: 145,
        seat_identifier: '296510310-4',
        seat_class: 'J',
      },
      {
        id: 146,
        seat_identifier: '370782015-7',
        seat_class: 'J',
      },
      {
        id: 147,
        seat_identifier: '450720816-5',
        seat_class: 'G',
      },
      {
        id: 148,
        seat_identifier: '175958083-X',
        seat_class: 'J',
      },
      {
        id: 149,
        seat_identifier: '623207875-6',
        seat_class: 'H',
      },
      {
        id: 150,
        seat_identifier: '873283483-7',
        seat_class: 'F',
      },
      {
        id: 151,
        seat_identifier: '056812242-9',
        seat_class: 'I',
      },
      {
        id: 152,
        seat_identifier: '833779342-2',
        seat_class: 'F',
      },
      {
        id: 153,
        seat_identifier: '335752604-2',
        seat_class: 'I',
      },
      {
        id: 154,
        seat_identifier: '040804122-6',
        seat_class: 'C',
      },
      {
        id: 155,
        seat_identifier: '813859194-3',
        seat_class: 'I',
      },
      {
        id: 156,
        seat_identifier: '761024939-4',
        seat_class: 'J',
      },
      {
        id: 157,
        seat_identifier: '899537212-5',
        seat_class: 'F',
      },
      {
        id: 158,
        seat_identifier: '568173143-X',
        seat_class: 'G',
      },
      {
        id: 159,
        seat_identifier: '732486808-8',
        seat_class: 'C',
      },
      {
        id: 160,
        seat_identifier: '915419684-1',
        seat_class: 'F',
      },
      {
        id: 161,
        seat_identifier: '004399942-5',
        seat_class: 'A',
      },
      {
        id: 162,
        seat_identifier: '670509759-0',
        seat_class: 'E',
      },
      {
        id: 163,
        seat_identifier: '659667144-5',
        seat_class: 'E',
      },
      {
        id: 164,
        seat_identifier: '189527003-0',
        seat_class: 'D',
      },
      {
        id: 165,
        seat_identifier: '871495496-6',
        seat_class: 'D',
      },
      {
        id: 166,
        seat_identifier: '747353718-0',
        seat_class: 'G',
      },
      {
        id: 167,
        seat_identifier: '224680263-6',
        seat_class: 'E',
      },
      {
        id: 168,
        seat_identifier: '446617103-3',
        seat_class: 'F',
      },
      {
        id: 169,
        seat_identifier: '948243726-8',
        seat_class: 'D',
      },
      {
        id: 170,
        seat_identifier: '903979085-X',
        seat_class: 'C',
      },
      {
        id: 171,
        seat_identifier: '181679056-7',
        seat_class: 'C',
      },
      {
        id: 172,
        seat_identifier: '771978632-7',
        seat_class: 'B',
      },
      {
        id: 173,
        seat_identifier: '985303295-3',
        seat_class: 'F',
      },
      {
        id: 174,
        seat_identifier: '607897867-5',
        seat_class: 'H',
      },
      {
        id: 175,
        seat_identifier: '723262074-8',
        seat_class: 'F',
      },
      {
        id: 176,
        seat_identifier: '156482399-7',
        seat_class: 'E',
      },
      {
        id: 177,
        seat_identifier: '649335909-0',
        seat_class: 'F',
      },
      {
        id: 178,
        seat_identifier: '892383356-8',
        seat_class: 'E',
      },
      {
        id: 179,
        seat_identifier: '178935667-9',
        seat_class: 'H',
      },
      {
        id: 180,
        seat_identifier: '635659816-6',
        seat_class: 'E',
      },
      {
        id: 181,
        seat_identifier: '593016077-5',
        seat_class: 'C',
      },
      {
        id: 182,
        seat_identifier: '185694425-5',
        seat_class: 'E',
      },
      {
        id: 183,
        seat_identifier: '608757652-5',
        seat_class: 'F',
      },
      {
        id: 184,
        seat_identifier: '498012993-5',
        seat_class: 'H',
      },
      {
        id: 185,
        seat_identifier: '258905326-6',
        seat_class: 'G',
      },
      {
        id: 186,
        seat_identifier: '770786017-9',
        seat_class: 'B',
      },
      {
        id: 187,
        seat_identifier: '883753985-1',
        seat_class: 'G',
      },
      {
        id: 188,
        seat_identifier: '733834304-7',
        seat_class: 'C',
      },
      {
        id: 189,
        seat_identifier: '979278335-0',
        seat_class: 'I',
      },
      {
        id: 190,
        seat_identifier: '770758369-8',
        seat_class: 'G',
      },
      {
        id: 191,
        seat_identifier: '762580124-1',
        seat_class: 'J',
      },
      {
        id: 192,
        seat_identifier: '000063591-X',
        seat_class: 'I',
      },
      {
        id: 193,
        seat_identifier: '851266137-2',
        seat_class: 'D',
      },
      {
        id: 194,
        seat_identifier: '645575804-8',
        seat_class: 'J',
      },
      {
        id: 195,
        seat_identifier: '931683071-0',
        seat_class: 'D',
      },
      {
        id: 196,
        seat_identifier: '577638482-6',
        seat_class: 'A',
      },
      {
        id: 197,
        seat_identifier: '669014237-X',
        seat_class: 'A',
      },
      {
        id: 198,
        seat_identifier: '917035956-3',
        seat_class: 'B',
      },
      {
        id: 199,
        seat_identifier: '213271513-0',
        seat_class: 'D',
      },
      {
        id: 200,
        seat_identifier: '985118614-7',
        seat_class: 'E',
      },
      {
        id: 201,
        seat_identifier: '812993535-X',
        seat_class: 'I',
      },
      {
        id: 202,
        seat_identifier: '106923828-7',
        seat_class: 'I',
      },
      {
        id: 203,
        seat_identifier: '239918168-9',
        seat_class: 'J',
      },
      {
        id: 204,
        seat_identifier: '621358491-9',
        seat_class: 'G',
      },
      {
        id: 205,
        seat_identifier: '272169573-8',
        seat_class: 'D',
      },
      {
        id: 206,
        seat_identifier: '770921780-X',
        seat_class: 'D',
      },
      {
        id: 207,
        seat_identifier: '386541286-6',
        seat_class: 'H',
      },
      {
        id: 208,
        seat_identifier: '785182760-4',
        seat_class: 'F',
      },
      {
        id: 209,
        seat_identifier: '197890936-5',
        seat_class: 'J',
      },
      {
        id: 210,
        seat_identifier: '235856387-0',
        seat_class: 'C',
      },
      {
        id: 211,
        seat_identifier: '722758331-7',
        seat_class: 'B',
      },
      {
        id: 212,
        seat_identifier: '893346064-0',
        seat_class: 'J',
      },
      {
        id: 213,
        seat_identifier: '916327056-0',
        seat_class: 'J',
      },
      {
        id: 214,
        seat_identifier: '514653720-8',
        seat_class: 'B',
      },
      {
        id: 215,
        seat_identifier: '070236424-X',
        seat_class: 'B',
      },
      {
        id: 216,
        seat_identifier: '204075548-9',
        seat_class: 'B',
      },
      {
        id: 217,
        seat_identifier: '188025534-0',
        seat_class: 'A',
      },
      {
        id: 218,
        seat_identifier: '756379067-5',
        seat_class: 'E',
      },
      {
        id: 219,
        seat_identifier: '979607840-6',
        seat_class: 'I',
      },
      {
        id: 220,
        seat_identifier: '518380714-0',
        seat_class: 'D',
      },
      {
        id: 221,
        seat_identifier: '960536935-4',
        seat_class: 'C',
      },
      {
        id: 222,
        seat_identifier: '632303093-4',
        seat_class: 'C',
      },
      {
        id: 223,
        seat_identifier: '164706963-7',
        seat_class: 'F',
      },
      {
        id: 224,
        seat_identifier: '581857944-1',
        seat_class: 'F',
      },
      {
        id: 225,
        seat_identifier: '330128958-4',
        seat_class: 'J',
      },
      {
        id: 226,
        seat_identifier: '589209511-8',
        seat_class: 'A',
      },
      {
        id: 227,
        seat_identifier: '211085343-3',
        seat_class: 'C',
      },
      {
        id: 228,
        seat_identifier: '655937637-0',
        seat_class: 'A',
      },
      {
        id: 229,
        seat_identifier: '033099310-0',
        seat_class: 'E',
      },
      {
        id: 230,
        seat_identifier: '115681717-X',
        seat_class: 'E',
      },
      {
        id: 231,
        seat_identifier: '784691620-3',
        seat_class: 'G',
      },
      {
        id: 232,
        seat_identifier: '014005321-2',
        seat_class: 'G',
      },
      {
        id: 233,
        seat_identifier: '909667579-7',
        seat_class: 'H',
      },
      {
        id: 234,
        seat_identifier: '519542199-4',
        seat_class: 'B',
      },
      {
        id: 235,
        seat_identifier: '098588842-3',
        seat_class: 'E',
      },
      {
        id: 236,
        seat_identifier: '004377768-6',
        seat_class: 'D',
      },
      {
        id: 237,
        seat_identifier: '748283374-9',
        seat_class: 'J',
      },
      {
        id: 238,
        seat_identifier: '765665495-X',
        seat_class: 'J',
      },
      {
        id: 239,
        seat_identifier: '218536129-5',
        seat_class: 'B',
      },
      {
        id: 240,
        seat_identifier: '131334024-3',
        seat_class: 'D',
      },
      {
        id: 241,
        seat_identifier: '074780030-8',
        seat_class: 'F',
      },
      {
        id: 242,
        seat_identifier: '760900690-4',
        seat_class: 'D',
      },
      {
        id: 243,
        seat_identifier: '548470560-6',
        seat_class: 'G',
      },
      {
        id: 244,
        seat_identifier: '303992900-3',
        seat_class: 'D',
      },
      {
        id: 245,
        seat_identifier: '735607469-9',
        seat_class: 'B',
      },
      {
        id: 246,
        seat_identifier: '695290377-1',
        seat_class: 'G',
      },
      {
        id: 247,
        seat_identifier: '006906097-5',
        seat_class: 'E',
      },
      {
        id: 248,
        seat_identifier: '418132884-8',
        seat_class: 'E',
      },
      {
        id: 249,
        seat_identifier: '194691319-7',
        seat_class: 'F',
      },
      {
        id: 250,
        seat_identifier: '846035808-9',
        seat_class: 'C',
      },
      {
        id: 251,
        seat_identifier: '046687228-3',
        seat_class: 'E',
      },
      {
        id: 252,
        seat_identifier: '774005000-8',
        seat_class: 'C',
      },
      {
        id: 253,
        seat_identifier: '893246453-7',
        seat_class: 'J',
      },
      {
        id: 254,
        seat_identifier: '811138733-4',
        seat_class: 'C',
      },
      {
        id: 255,
        seat_identifier: '604319170-9',
        seat_class: 'G',
      },
      {
        id: 256,
        seat_identifier: '069006105-6',
        seat_class: 'I',
      },
      {
        id: 257,
        seat_identifier: '258759313-1',
        seat_class: 'E',
      },
      {
        id: 258,
        seat_identifier: '771313208-2',
        seat_class: 'G',
      },
      {
        id: 259,
        seat_identifier: '933047315-6',
        seat_class: 'I',
      },
      {
        id: 260,
        seat_identifier: '852438568-5',
        seat_class: 'B',
      },
      {
        id: 261,
        seat_identifier: '120226576-6',
        seat_class: 'G',
      },
      {
        id: 262,
        seat_identifier: '136364305-3',
        seat_class: 'E',
      },
      {
        id: 263,
        seat_identifier: '581987445-5',
        seat_class: 'E',
      },
      {
        id: 264,
        seat_identifier: '120922726-6',
        seat_class: 'A',
      },
      {
        id: 265,
        seat_identifier: '452219276-2',
        seat_class: 'A',
      },
      {
        id: 266,
        seat_identifier: '334228707-1',
        seat_class: 'H',
      },
      {
        id: 267,
        seat_identifier: '943656264-0',
        seat_class: 'A',
      },
      {
        id: 268,
        seat_identifier: '791464183-9',
        seat_class: 'B',
      },
      {
        id: 269,
        seat_identifier: '720889007-2',
        seat_class: 'D',
      },
      {
        id: 270,
        seat_identifier: '457063413-3',
        seat_class: 'D',
      },
      {
        id: 271,
        seat_identifier: '126925210-0',
        seat_class: 'B',
      },
      {
        id: 272,
        seat_identifier: '480186246-2',
        seat_class: 'H',
      },
      {
        id: 273,
        seat_identifier: '096090205-8',
        seat_class: 'B',
      },
      {
        id: 274,
        seat_identifier: '345691912-3',
        seat_class: 'G',
      },
      {
        id: 275,
        seat_identifier: '604353562-9',
        seat_class: 'A',
      },
      {
        id: 276,
        seat_identifier: '567870932-1',
        seat_class: 'A',
      },
      {
        id: 277,
        seat_identifier: '194080462-0',
        seat_class: 'G',
      },
      {
        id: 278,
        seat_identifier: '933381450-7',
        seat_class: 'F',
      },
      {
        id: 279,
        seat_identifier: '294368637-9',
        seat_class: 'A',
      },
      {
        id: 280,
        seat_identifier: '980566461-9',
        seat_class: 'H',
      },
      {
        id: 281,
        seat_identifier: '012959885-2',
        seat_class: 'A',
      },
      {
        id: 282,
        seat_identifier: '849875489-5',
        seat_class: 'H',
      },
      {
        id: 283,
        seat_identifier: '857395358-6',
        seat_class: 'H',
      },
      {
        id: 284,
        seat_identifier: '855522733-X',
        seat_class: 'E',
      },
      {
        id: 285,
        seat_identifier: '258379705-0',
        seat_class: 'D',
      },
      {
        id: 286,
        seat_identifier: '634348798-0',
        seat_class: 'G',
      },
      {
        id: 287,
        seat_identifier: '256894304-1',
        seat_class: 'E',
      },
      {
        id: 288,
        seat_identifier: '735782485-3',
        seat_class: 'B',
      },
      {
        id: 289,
        seat_identifier: '734962778-5',
        seat_class: 'B',
      },
      {
        id: 290,
        seat_identifier: '752231905-6',
        seat_class: 'G',
      },
      {
        id: 291,
        seat_identifier: '148845680-1',
        seat_class: 'G',
      },
      {
        id: 292,
        seat_identifier: '431480473-4',
        seat_class: 'C',
      },
      {
        id: 293,
        seat_identifier: '797403939-6',
        seat_class: 'C',
      },
      {
        id: 294,
        seat_identifier: '973918114-7',
        seat_class: 'G',
      },
      {
        id: 295,
        seat_identifier: '246991432-9',
        seat_class: 'A',
      },
      {
        id: 296,
        seat_identifier: '771668614-3',
        seat_class: 'D',
      },
      {
        id: 297,
        seat_identifier: '898702240-4',
        seat_class: 'C',
      },
      {
        id: 298,
        seat_identifier: '148448110-0',
        seat_class: 'I',
      },
      {
        id: 299,
        seat_identifier: '776236593-1',
        seat_class: 'A',
      },
      {
        id: 300,
        seat_identifier: '248920367-3',
        seat_class: 'J',
      },
      {
        id: 301,
        seat_identifier: '056237424-8',
        seat_class: 'H',
      },
      {
        id: 302,
        seat_identifier: '760592249-3',
        seat_class: 'I',
      },
      {
        id: 303,
        seat_identifier: '212083206-4',
        seat_class: 'I',
      },
      {
        id: 304,
        seat_identifier: '198289199-8',
        seat_class: 'H',
      },
      {
        id: 305,
        seat_identifier: '739219394-5',
        seat_class: 'C',
      },
      {
        id: 306,
        seat_identifier: '098254779-X',
        seat_class: 'B',
      },
      {
        id: 307,
        seat_identifier: '153565621-2',
        seat_class: 'D',
      },
      {
        id: 308,
        seat_identifier: '701691440-2',
        seat_class: 'D',
      },
      {
        id: 309,
        seat_identifier: '748910239-1',
        seat_class: 'I',
      },
      {
        id: 310,
        seat_identifier: '572880011-4',
        seat_class: 'A',
      },
      {
        id: 311,
        seat_identifier: '342808328-8',
        seat_class: 'A',
      },
      {
        id: 312,
        seat_identifier: '203545672-X',
        seat_class: 'B',
      },
      {
        id: 313,
        seat_identifier: '930778298-9',
        seat_class: 'F',
      },
      {
        id: 314,
        seat_identifier: '564938738-9',
        seat_class: 'C',
      },
      {
        id: 315,
        seat_identifier: '524988351-6',
        seat_class: 'C',
      },
      {
        id: 316,
        seat_identifier: '497257139-X',
        seat_class: 'B',
      },
      {
        id: 317,
        seat_identifier: '685132152-1',
        seat_class: 'A',
      },
      {
        id: 318,
        seat_identifier: '276363930-5',
        seat_class: 'B',
      },
      {
        id: 319,
        seat_identifier: '056789462-2',
        seat_class: 'F',
      },
      {
        id: 320,
        seat_identifier: '729542860-7',
        seat_class: 'C',
      },
      {
        id: 321,
        seat_identifier: '605737783-4',
        seat_class: 'H',
      },
      {
        id: 322,
        seat_identifier: '635664930-5',
        seat_class: 'I',
      },
      {
        id: 323,
        seat_identifier: '803687208-0',
        seat_class: 'D',
      },
      {
        id: 324,
        seat_identifier: '593501024-0',
        seat_class: 'F',
      },
      {
        id: 325,
        seat_identifier: '053662652-9',
        seat_class: 'I',
      },
      {
        id: 326,
        seat_identifier: '045876556-2',
        seat_class: 'J',
      },
      {
        id: 327,
        seat_identifier: '009961607-6',
        seat_class: 'E',
      },
      {
        id: 328,
        seat_identifier: '581258007-3',
        seat_class: 'E',
      },
      {
        id: 329,
        seat_identifier: '039449873-9',
        seat_class: 'G',
      },
      {
        id: 330,
        seat_identifier: '655977797-9',
        seat_class: 'C',
      },
      {
        id: 331,
        seat_identifier: '010321849-1',
        seat_class: 'F',
      },
      {
        id: 332,
        seat_identifier: '637110800-X',
        seat_class: 'F',
      },
      {
        id: 333,
        seat_identifier: '146933551-4',
        seat_class: 'E',
      },
      {
        id: 334,
        seat_identifier: '089755722-0',
        seat_class: 'B',
      },
      {
        id: 335,
        seat_identifier: '975601531-4',
        seat_class: 'H',
      },
      {
        id: 336,
        seat_identifier: '206005321-8',
        seat_class: 'B',
      },
      {
        id: 337,
        seat_identifier: '991866571-8',
        seat_class: 'A',
      },
      {
        id: 338,
        seat_identifier: '643887716-6',
        seat_class: 'B',
      },
      {
        id: 339,
        seat_identifier: '970917975-6',
        seat_class: 'J',
      },
      {
        id: 340,
        seat_identifier: '497840064-3',
        seat_class: 'B',
      },
      {
        id: 341,
        seat_identifier: '127043776-3',
        seat_class: 'J',
      },
      {
        id: 342,
        seat_identifier: '838153759-2',
        seat_class: 'C',
      },
      {
        id: 343,
        seat_identifier: '749634648-9',
        seat_class: 'J',
      },
      {
        id: 344,
        seat_identifier: '899563719-6',
        seat_class: 'C',
      },
      {
        id: 345,
        seat_identifier: '900407009-5',
        seat_class: 'G',
      },
      {
        id: 346,
        seat_identifier: '120009770-X',
        seat_class: 'B',
      },
      {
        id: 347,
        seat_identifier: '428073956-0',
        seat_class: 'J',
      },
      {
        id: 348,
        seat_identifier: '810316944-7',
        seat_class: 'H',
      },
      {
        id: 349,
        seat_identifier: '085905013-0',
        seat_class: 'H',
      },
      {
        id: 350,
        seat_identifier: '258574027-7',
        seat_class: 'B',
      },
      {
        id: 351,
        seat_identifier: '682698088-6',
        seat_class: 'A',
      },
      {
        id: 352,
        seat_identifier: '344157328-5',
        seat_class: 'H',
      },
      {
        id: 353,
        seat_identifier: '352692179-2',
        seat_class: 'I',
      },
      {
        id: 354,
        seat_identifier: '270567879-4',
        seat_class: 'H',
      },
      {
        id: 355,
        seat_identifier: '972967945-2',
        seat_class: 'A',
      },
      {
        id: 356,
        seat_identifier: '665203525-1',
        seat_class: 'A',
      },
      {
        id: 357,
        seat_identifier: '600014103-3',
        seat_class: 'I',
      },
      {
        id: 358,
        seat_identifier: '642171926-0',
        seat_class: 'B',
      },
      {
        id: 359,
        seat_identifier: '669729251-2',
        seat_class: 'J',
      },
      {
        id: 360,
        seat_identifier: '981382611-8',
        seat_class: 'D',
      },
      {
        id: 361,
        seat_identifier: '650317406-3',
        seat_class: 'D',
      },
      {
        id: 362,
        seat_identifier: '069701220-4',
        seat_class: 'C',
      },
      {
        id: 363,
        seat_identifier: '259251987-4',
        seat_class: 'D',
      },
      {
        id: 364,
        seat_identifier: '617665058-5',
        seat_class: 'J',
      },
      {
        id: 365,
        seat_identifier: '185751500-5',
        seat_class: 'J',
      },
      {
        id: 366,
        seat_identifier: '624468272-6',
        seat_class: 'D',
      },
      {
        id: 367,
        seat_identifier: '353014327-8',
        seat_class: 'E',
      },
      {
        id: 368,
        seat_identifier: '915351151-4',
        seat_class: 'B',
      },
      {
        id: 369,
        seat_identifier: '401189868-6',
        seat_class: 'E',
      },
      {
        id: 370,
        seat_identifier: '407855110-6',
        seat_class: 'I',
      },
      {
        id: 371,
        seat_identifier: '614903318-X',
        seat_class: 'C',
      },
      {
        id: 372,
        seat_identifier: '250896076-4',
        seat_class: 'C',
      },
      {
        id: 373,
        seat_identifier: '039851728-2',
        seat_class: 'J',
      },
      {
        id: 374,
        seat_identifier: '108487099-1',
        seat_class: 'H',
      },
      {
        id: 375,
        seat_identifier: '215801032-0',
        seat_class: 'G',
      },
      {
        id: 376,
        seat_identifier: '238411443-3',
        seat_class: 'I',
      },
      {
        id: 377,
        seat_identifier: '280128422-X',
        seat_class: 'A',
      },
      {
        id: 378,
        seat_identifier: '824402110-1',
        seat_class: 'B',
      },
      {
        id: 379,
        seat_identifier: '721097239-0',
        seat_class: 'C',
      },
      {
        id: 380,
        seat_identifier: '172343595-3',
        seat_class: 'J',
      },
      {
        id: 381,
        seat_identifier: '415406459-2',
        seat_class: 'G',
      },
      {
        id: 382,
        seat_identifier: '595997006-6',
        seat_class: 'D',
      },
      {
        id: 383,
        seat_identifier: '334741022-X',
        seat_class: 'D',
      },
      {
        id: 384,
        seat_identifier: '358163036-2',
        seat_class: 'B',
      },
      {
        id: 385,
        seat_identifier: '692706911-9',
        seat_class: 'A',
      },
      {
        id: 386,
        seat_identifier: '842840669-3',
        seat_class: 'E',
      },
      {
        id: 387,
        seat_identifier: '843152734-X',
        seat_class: 'G',
      },
      {
        id: 388,
        seat_identifier: '414268705-0',
        seat_class: 'A',
      },
      {
        id: 389,
        seat_identifier: '709588564-8',
        seat_class: 'B',
      },
      {
        id: 390,
        seat_identifier: '249770012-5',
        seat_class: 'E',
      },
      {
        id: 391,
        seat_identifier: '676244790-2',
        seat_class: 'H',
      },
      {
        id: 392,
        seat_identifier: '333895110-8',
        seat_class: 'F',
      },
      {
        id: 393,
        seat_identifier: '903333757-6',
        seat_class: 'H',
      },
      {
        id: 394,
        seat_identifier: '002596113-6',
        seat_class: 'J',
      },
      {
        id: 395,
        seat_identifier: '223493928-3',
        seat_class: 'H',
      },
      {
        id: 396,
        seat_identifier: '359790236-7',
        seat_class: 'H',
      },
      {
        id: 397,
        seat_identifier: '631385338-5',
        seat_class: 'D',
      },
      {
        id: 398,
        seat_identifier: '862733247-9',
        seat_class: 'A',
      },
      {
        id: 399,
        seat_identifier: '941871767-0',
        seat_class: 'E',
      },
      {
        id: 400,
        seat_identifier: '270421118-3',
        seat_class: 'I',
      },
      {
        id: 401,
        seat_identifier: '840961062-0',
        seat_class: 'E',
      },
      {
        id: 402,
        seat_identifier: '528728500-0',
        seat_class: 'J',
      },
      {
        id: 403,
        seat_identifier: '663215892-7',
        seat_class: 'I',
      },
      {
        id: 404,
        seat_identifier: '492891938-6',
        seat_class: 'E',
      },
      {
        id: 405,
        seat_identifier: '538496027-2',
        seat_class: 'C',
      },
      {
        id: 406,
        seat_identifier: '440558545-8',
        seat_class: 'F',
      },
      {
        id: 407,
        seat_identifier: '221584621-6',
        seat_class: 'E',
      },
      {
        id: 408,
        seat_identifier: '754001951-4',
        seat_class: 'J',
      },
      {
        id: 409,
        seat_identifier: '917593741-7',
        seat_class: 'E',
      },
      {
        id: 410,
        seat_identifier: '003024942-2',
        seat_class: 'E',
      },
      {
        id: 411,
        seat_identifier: '662132847-8',
        seat_class: 'G',
      },
      {
        id: 412,
        seat_identifier: '276274308-7',
        seat_class: 'H',
      },
      {
        id: 413,
        seat_identifier: '865424714-2',
        seat_class: 'I',
      },
      {
        id: 414,
        seat_identifier: '561630056-X',
        seat_class: 'C',
      },
      {
        id: 415,
        seat_identifier: '100124750-7',
        seat_class: 'G',
      },
      {
        id: 416,
        seat_identifier: '786831946-1',
        seat_class: 'E',
      },
      {
        id: 417,
        seat_identifier: '447097593-1',
        seat_class: 'D',
      },
      {
        id: 418,
        seat_identifier: '447253853-9',
        seat_class: 'D',
      },
      {
        id: 419,
        seat_identifier: '942196235-4',
        seat_class: 'F',
      },
      {
        id: 420,
        seat_identifier: '808014409-5',
        seat_class: 'I',
      },
      {
        id: 421,
        seat_identifier: '956113638-4',
        seat_class: 'B',
      },
      {
        id: 422,
        seat_identifier: '631875611-6',
        seat_class: 'H',
      },
      {
        id: 423,
        seat_identifier: '414792325-9',
        seat_class: 'J',
      },
      {
        id: 424,
        seat_identifier: '383386324-2',
        seat_class: 'B',
      },
      {
        id: 425,
        seat_identifier: '086850895-0',
        seat_class: 'J',
      },
      {
        id: 426,
        seat_identifier: '247302184-8',
        seat_class: 'F',
      },
      {
        id: 427,
        seat_identifier: '182641200-X',
        seat_class: 'A',
      },
      {
        id: 428,
        seat_identifier: '938255703-2',
        seat_class: 'C',
      },
      {
        id: 429,
        seat_identifier: '441610334-4',
        seat_class: 'J',
      },
      {
        id: 430,
        seat_identifier: '471755912-6',
        seat_class: 'F',
      },
      {
        id: 431,
        seat_identifier: '196510607-2',
        seat_class: 'B',
      },
      {
        id: 432,
        seat_identifier: '050069607-1',
        seat_class: 'H',
      },
      {
        id: 433,
        seat_identifier: '649329704-4',
        seat_class: 'I',
      },
      {
        id: 434,
        seat_identifier: '384681777-5',
        seat_class: 'A',
      },
      {
        id: 435,
        seat_identifier: '191206054-X',
        seat_class: 'J',
      },
      {
        id: 436,
        seat_identifier: '852001375-9',
        seat_class: 'D',
      },
      {
        id: 437,
        seat_identifier: '429140197-3',
        seat_class: 'B',
      },
      {
        id: 438,
        seat_identifier: '501608748-2',
        seat_class: 'F',
      },
      {
        id: 439,
        seat_identifier: '649976546-5',
        seat_class: 'D',
      },
      {
        id: 440,
        seat_identifier: '510719447-8',
        seat_class: 'H',
      },
      {
        id: 441,
        seat_identifier: '189362465-X',
        seat_class: 'C',
      },
      {
        id: 442,
        seat_identifier: '922989962-3',
        seat_class: 'J',
      },
      {
        id: 443,
        seat_identifier: '708285365-3',
        seat_class: 'D',
      },
      {
        id: 444,
        seat_identifier: '624930451-7',
        seat_class: 'C',
      },
      {
        id: 445,
        seat_identifier: '842025629-3',
        seat_class: 'G',
      },
      {
        id: 446,
        seat_identifier: '933496862-1',
        seat_class: 'F',
      },
      {
        id: 447,
        seat_identifier: '360829085-0',
        seat_class: 'C',
      },
      {
        id: 448,
        seat_identifier: '619153430-2',
        seat_class: 'H',
      },
      {
        id: 449,
        seat_identifier: '006248596-2',
        seat_class: 'F',
      },
      {
        id: 450,
        seat_identifier: '168103260-0',
        seat_class: 'J',
      },
      {
        id: 451,
        seat_identifier: '609295348-X',
        seat_class: 'H',
      },
      {
        id: 452,
        seat_identifier: '865474318-2',
        seat_class: 'B',
      },
      {
        id: 453,
        seat_identifier: '971707234-5',
        seat_class: 'I',
      },
      {
        id: 454,
        seat_identifier: '453269772-7',
        seat_class: 'I',
      },
      {
        id: 455,
        seat_identifier: '497251615-1',
        seat_class: 'H',
      },
      {
        id: 456,
        seat_identifier: '827682360-2',
        seat_class: 'G',
      },
      {
        id: 457,
        seat_identifier: '931392684-9',
        seat_class: 'I',
      },
      {
        id: 458,
        seat_identifier: '097934527-8',
        seat_class: 'D',
      },
      {
        id: 459,
        seat_identifier: '369033106-4',
        seat_class: 'F',
      },
      {
        id: 460,
        seat_identifier: '156589821-4',
        seat_class: 'A',
      },
      {
        id: 461,
        seat_identifier: '467498063-1',
        seat_class: 'B',
      },
      {
        id: 462,
        seat_identifier: '100904127-4',
        seat_class: 'F',
      },
      {
        id: 463,
        seat_identifier: '423033045-6',
        seat_class: 'F',
      },
      {
        id: 464,
        seat_identifier: '478417418-4',
        seat_class: 'B',
      },
      {
        id: 465,
        seat_identifier: '244340191-X',
        seat_class: 'F',
      },
      {
        id: 466,
        seat_identifier: '897287615-1',
        seat_class: 'D',
      },
      {
        id: 467,
        seat_identifier: '233401692-6',
        seat_class: 'D',
      },
      {
        id: 468,
        seat_identifier: '022819783-X',
        seat_class: 'C',
      },
      {
        id: 469,
        seat_identifier: '047092168-4',
        seat_class: 'I',
      },
      {
        id: 470,
        seat_identifier: '399485493-8',
        seat_class: 'D',
      },
      {
        id: 471,
        seat_identifier: '299039299-8',
        seat_class: 'D',
      },
      {
        id: 472,
        seat_identifier: '220200499-8',
        seat_class: 'F',
      },
      {
        id: 473,
        seat_identifier: '855461491-7',
        seat_class: 'J',
      },
      {
        id: 474,
        seat_identifier: '740443173-5',
        seat_class: 'G',
      },
      {
        id: 475,
        seat_identifier: '512557799-5',
        seat_class: 'E',
      },
      {
        id: 476,
        seat_identifier: '286235056-7',
        seat_class: 'G',
      },
      {
        id: 477,
        seat_identifier: '794306423-2',
        seat_class: 'D',
      },
      {
        id: 478,
        seat_identifier: '708681044-4',
        seat_class: 'D',
      },
      {
        id: 479,
        seat_identifier: '883048740-6',
        seat_class: 'G',
      },
      {
        id: 480,
        seat_identifier: '049396863-6',
        seat_class: 'I',
      },
      {
        id: 481,
        seat_identifier: '088944088-3',
        seat_class: 'J',
      },
      {
        id: 482,
        seat_identifier: '035083762-7',
        seat_class: 'F',
      },
      {
        id: 483,
        seat_identifier: '294795948-5',
        seat_class: 'D',
      },
      {
        id: 484,
        seat_identifier: '279138568-1',
        seat_class: 'J',
      },
      {
        id: 485,
        seat_identifier: '639841110-2',
        seat_class: 'D',
      },
      {
        id: 486,
        seat_identifier: '750005525-0',
        seat_class: 'C',
      },
      {
        id: 487,
        seat_identifier: '210033465-4',
        seat_class: 'J',
      },
      {
        id: 488,
        seat_identifier: '116105380-8',
        seat_class: 'B',
      },
      {
        id: 489,
        seat_identifier: '549980655-1',
        seat_class: 'F',
      },
      {
        id: 490,
        seat_identifier: '075656955-9',
        seat_class: 'E',
      },
      {
        id: 491,
        seat_identifier: '829500586-3',
        seat_class: 'E',
      },
      {
        id: 492,
        seat_identifier: '801029386-5',
        seat_class: 'D',
      },
      {
        id: 493,
        seat_identifier: '926486033-9',
        seat_class: 'D',
      },
      {
        id: 494,
        seat_identifier: '975709076-X',
        seat_class: 'D',
      },
      {
        id: 495,
        seat_identifier: '077398444-5',
        seat_class: 'G',
      },
      {
        id: 496,
        seat_identifier: '229209436-3',
        seat_class: 'J',
      },
      {
        id: 497,
        seat_identifier: '330529090-0',
        seat_class: 'E',
      },
      {
        id: 498,
        seat_identifier: '991800266-2',
        seat_class: 'J',
      },
      {
        id: 499,
        seat_identifier: '250057126-2',
        seat_class: 'J',
      },
      {
        id: 500,
        seat_identifier: '599628912-1',
        seat_class: 'B',
      },
    ];
  }
}
