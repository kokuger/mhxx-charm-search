const charmTables = {
  blue: {
    skill1: [
      4,5,10,11,14,15,25,31,32,35,
      36,37,38,39,40,41,42,44,45,47,
      48,49,50,64,65,66,68,70,71,72,
      73,76,77,78,79,80,81,82,83,84,
      85,86,87,90,92,93,94,95,97,99,
      100,101,106,107,108,109,114,115,116,122,
      123,132
    ],
    sp1: [
      [3,7],[5,10],[3,7],[3,7],[3,7],[5,10],[3,7],[3,7],[3,7],[3,7],
      [3,7],[1,5],[2,6],[1,5],[1,5],[5,10],[5,10],[3,7],[2,6],[2,6],
      [2,6],[2,6],[2,6],[1,5],[1,5],[1,5],[3,7],[2,6],[1,5],[2,6],
      [2,6],[2,6],[2,6],[3,7],[3,7],[2,6],[2,6],[2,6],[1,5],[3,7],
      [3,7],[5,10],[5,10],[2,6],[2,6],[1,5],[1,5],[1,5],[2,6],[2,6],
      [2,6],[1,5],[2,6],[1,5],[3,7],[3,7],[3,7],[1,5],[3,7],[2,6],
      [3,7],[3,7]
    ],
    skill2: [
      4,5,17,18,25,26,27,28,29,30,
      32,33,34,35,36,37,39,40,41,43,
      44,45,47,48,49,50,64,65,66,68,
      69,70,71,74,75,76,77,78,79,80,
      81,82,83,84,85,86,87,88,89,90,
      91,92,93,94,95,96,97,99,100,101,
      105,106,107,108,109,114,115,116,119,122,
      123,125,132,134,135,136,161,162,163,164,
      165,166,167,168,169,170,171,172,173,174,
      175,176,177,178
    ],
    sp2: [
      [3,5],[5,7],[7,10],[5,13],[5,7],[5,13],[5,13],[5,13],[5,13],[5,13],
      [5,7],[7,10],[3,5],[5,7],[5,7],[3,5],[5,5],[2,8],[5,7],[3,3],
      [5,7],[5,7],[3,5],[3,5],[3,5],[3,5],[3,5],[3,5],[3,5],[5,7],
      [7,10],[3,5],[1,3],[3,5],[3,3],[3,5],[3,5],[3,5],[3,5],[3,5],
      [3,5],[3,5],[1,3],[3,5],[3,5],[7,10],[7,10],[5,10],[5,10],[3,5],
      [5,10],[3,5],[1,3],[1,3],[1,3],[3,3],[3,5],[3,5],[3,5],[1,3],
      [7,10],[3,5],[1,3],[5,7],[5,7],[7,10],[1,3],[3,5],[5,12],[3,5],
      [5,7],[3,5],[7,10],[5,7],[3,5],[5,7],[3,3],[3,3],[3,3],[3,3],
      [3,3],[3,3],[3,3],[3,3],[3,3],[3,3],[3,3],[3,3],[3,3],[3,3],
      [3,3],[3,3],[3,3],[3,3]
    ],
    slotvalue: [
      [100,100,100],[3,53,88],[5,55,89],[7,57,89],[13,58,89],
      [16,60,90],[22,62,90],[30,66,90],[38,68,91],[50,72,91],
      [55,75,92],[59,77,92],[64,81,94],[67,83,94],[71,86,96],
      [74,88,96],[79,91,98],[82,92,98],[86,94,99],[90,96,99]
    ],
    th: 15,
    kind: 0
  },
  red: {
    skill1: [],
    sp1: [],
    skill2: [],
    sp2: [],
    slotvalue: [],
    th: 25,
    kind: 1
  },
  yellow: {
    skill1: [],
    sp1: [],
    skill2: [],
    sp2: [],
    slotvalue: [],
    th: 35,
    kind: 2
  },
  white: {
    skill1: [],
    sp1: [],
    skill2: [],
    sp2: [],
    slotvalue: [],
    th: 100,
    kind: 3
  }
};

const skill = [
  '毒　','麻痺','睡眠','気絶','聴覚','風圧','耐震','だる','耐暑','耐寒',
  '寒冷','炎熱','盗み','対防','狂撃','細菌','裂傷','攻撃','防御','体力',
  '火耐','水耐','雷耐','氷耐','龍耐','属耐','火攻','水攻','雷攻','氷攻',
  '龍攻','属攻','特攻','研師','匠　','斬味','剣術','研磨','鈍器','抜会',
  '抜減','納刀','納研','刃鱗','装速','反動','精密','通強','貫強','散強',
  '重強','通追','貫追','散追','榴追','拡追','毒追','麻追','睡追','強追',
  '属追','接追','減追','爆追','速射','射法','装数','変則','弾節','達人',
  '痛撃','連撃','特会','属会','会心','裏会','溜短','スタ','体術','気力',
  '走行','回性','回距','泡沫','ガ性','ガ強','ＫＯ','減攻','笛　','砲術',
  '重撃','爆弾','本気','闘魂','無傷','チャ','龍気','底力','逆境','逆上',
  '窮地','根性','気配','采配','号令','乗り','跳躍','無心','我慢','ＳＰ',
  '千里','観察','狩人','運搬','加護','英雄','回量','回速','効果','広域',
  '腹減','食い','食事','節食','肉食','茸食','野草','調成','調数','高速',
  '採取','ハチ','護石','気ま','運気','剥取','捕獲','ベル','ココ','ポッ',
  'ユク','龍識','飛行','紅兜','大雪','矛砕','岩穿','紫毒','宝纏','白疾',
  '隻眼','黒炎','金雷','荒鉤','燼滅','朧隠','鎧裂','天眼','青電','銀嶺',
  '鏖魔','真紅','真大','真矛','真岩','真紫','真宝','真白','真隻','真黒',
  '真金','真荒','真燼','真朧','真鎧','真天','真青','真銀','真鏖','北辰',
  '斬術','食欲','職工','剛腕','祈願','裏稼','刀匠','射手','状態','怒　',
  '回術','居合','頑強','剛撃','盾持','潔癖','増幅','護収','強欲','対鋼',
  '対霞','対炎','胴倍','秘術','護強'
];

const origin = ['マカ', '炭鉱'];
const kinds = ['風化したお守り', '古びたお守り', '光るお守り', 'なぞのお守り'];
const melding = ['マカフシギ', '天運'];

const kindWidth = '　<7';
const noskill = '◯◯----';
const skillWidth = '　<2';

// =========================
// RNG state
// =========================
const s = [0x0194FD72, 0x79E6C985, 0x08DD9701, 0x41CFC9E1];

let x = 0;
let y = 0;
let z = 0;
let w = 0;
let t = 0;
let f = 0;

let r0 = 0;
let r1 = 0;
let r2 = 0;
let r3 = 0;
let r4 = 0;
let r5 = 0;
let r6 = 0;

let currentTable = null;

function setTable(color) {
  currentTable = charmTables[color];
}

setTable("blue");

function u32(n) {
  return n >>> 0;
}

function mod(a, b) {
  return ((a % b) + b) % b;
}

function init() {
  x = s[0];
  y = s[1];
  z = s[2];
  w = s[3];
  t = 0;
  f = 0;

  r0 = 0;
  r1 = 0;
  r2 = 0;
  r3 = 0;
  r4 = 0;
  r5 = 0;
  r6 = 0;
}

function ascend() {
  t = u32(x ^ (x << 15));
  x = y;
  y = z;
  z = w;
  w = u32(w ^ (w >>> 21) ^ t ^ (t >>> 4));
  f += 1;
}

function descend() {
  t = u32(w ^ z ^ (z >>> 21));
  t = u32(t ^ (t >>> 4));
  t = u32(t ^ (t >>> 8));
  t = u32(t ^ (t >>> 16));
  w = z;
  z = y;
  y = x;
  x = u32(t ^ (t << 15) ^ (t << 30));
  f -= 1;
}

function roll() {
  r0 = r1;
  r1 = r2;
  r2 = r3;
  r3 = r4;
  r4 = r5;
  r5 = r6;
  r6 = w;
  ascend();
}

function watch(frame) {
  const d = Math.floor(frame / 2592000);
  const h = Math.floor((frame % 2592000) / 108000);
  const m = Math.floor((frame % 108000) / 1800);
  const sec = Math.floor((frame % 1800) / 30);
  const ff = frame % 30;
  return `${d}d ${h}h ${m}m ${sec}s ${ff}f`;
}

function slot(fill, num1) {
  const slotvalue = currentTable.slotvalue;

  if (fill <= 0) {
    return 0;
  }

  if (num1 >= slotvalue[fill - 1][2]) return 3;
  if (num1 >= slotvalue[fill - 1][1]) return 2;
  if (num1 >= slotvalue[fill - 1][0]) return 1;
  return 0;
}

function rare(slotNum, fill) {
  const kind = currentTable.kind;
  const num1 = slotNum * 2 + fill;

  switch (kind) {
    case 0:
      return num1 >= 13 ? 10 : num1 >= 8 ? 9 : 8;
    case 1:
      return num1 >= 13 ? 7 : num1 >= 8 ? 6 : 5;
    case 2:
      return num1 >= 8 ? 4 : 3;
    case 3:
      return num1 >= 8 ? 2 : 1;
    default:
      return 0;
  }
}

function parameter(str1, num1, str2, num2, num3, str3) {
  const _id1 = currentTable.skill1.indexOf(skill.indexOf(str1));
  const _sp1 = Number(num1);

  let _id2 = null;
  let _sp2 = 0;

  if (str2 !== null && str2 !== "") {
    _id2 = currentTable.skill2.indexOf(skill.indexOf(str2));
    _sp2 = Number(num2);
  }

  const _slot = Number(num3);
  const _origin = origin.indexOf(str3);
  const _len1 = currentTable.skill1.length;
  const _len2 = currentTable.skill2.length;

  return [_id1, _sp1, _id2, _sp2, _slot, _origin, _len1, _len2];
}

function getCharm(_origin) {
  const c = new Array(8);

  const skill1List = currentTable.skill1;
  const sp1List = currentTable.sp1;
  const skill2List = currentTable.skill2;
  const sp2List = currentTable.sp2;
  const th = currentTable.th;

  const id1 = mod(r0, skill1List.length);
  const id2 = mod(r3, skill2List.length);

  const s1 = sp1List[id1][1];
  const s2 = sp2List[id2][1];

  c[0] = skill1List[id1];

  const tmp1 = mod(r1, sp1List[id1][1] - sp1List[id1][0] + 1) + sp1List[id1][0];
  c[1] = tmp1;

  let tmp2 = 0;
  let q4 = 0;
  let q5 = 0;

  if (mod(r2, 100) >= th) {
    c[2] = skill2List[id2];

    if (_origin === 1 && mod(r4, 2) === 0) {
      q4 = r5;
      q5 = r6;
      tmp2 = mod(q4, sp2List[id2][0] + 1) - sp2List[id2][0];
    } else {
      if (_origin === 1) {
        q4 = r5;
        q5 = r6;
      } else {
        q4 = r4;
        q5 = r5;
      }
      tmp2 = mod(q4, sp2List[id2][1]) + 1;
    }

    c[3] = tmp2;

    if (skill1List[id1] === skill2List[id2] || tmp2 < 0) {
      tmp2 = 0;
    }
  } else {
    c[2] = null;
    c[3] = 0;
    q5 = r3;
  }

  const tmp0 = Math.floor(((tmp1 * s2 + tmp2 * s1) * 10) / (s1 * s2));

  c[4] = slot(tmp0, mod(q5, 100));
  c[5] = tmp0;
  c[6] = mod(q5, 100);
  c[7] = rare(c[4], c[5]);

  return c;
}

function searchOne(_id1, _sp1, _id2, _sp2, _slot, _origin, _len1, _len2) {
  roll();
  const c = getCharm(_origin);

  if (_id2 === null) {
    if (mod(r0, _len1) === _id1 && c[1] === _sp1 && c[2] === null && c[4] === _slot) {
      return {
        found: true,
        frame: f - 7,
        watch: watch(f - 7),
        charm: c
      };
    }
  } else {
    if (
      mod(r0, _len1) === _id1 &&
      mod(r2, 100) >= currentTable.th &&
      mod(r3, _len2) === _id2 &&
      c[1] === _sp1 &&
      c[2] !== null &&
      c[3] === _sp2 &&
      c[4] === _slot
    ) {
      return {
        found: true,
        frame: f - 7,
        watch: watch(f - 7),
        charm: c
      };
    }
  }

  return {
    found: false,
    frame: null,
    watch: null,
    charm: null
  };
}

function searchFrames(param, maxFrames) {
  init();
  const results = [];

  for (let i = 0; i < maxFrames; i++) {
    const res = searchOne(...param);
    if (res.found) {
      results.push(res);
    }
  }

  return results;
}

const button = document.getElementById("checkButton");
const result = document.getElementById("result");

button.addEventListener("click", () => {
  const skill1Name = document.getElementById("skill1").value.trim();
  const skill1Value = document.getElementById("skill1Value").value;
  const skill2Name = document.getElementById("skill2").value.trim();
  const skill2Value = document.getElementById("skill2Value").value;
  const slot = document.getElementById("slot").value;

  try {
    const p = parameter(
      skill1Name,
      Number(skill1Value),
      skill2Name === "" ? null : skill2Name,
      skill2Value === "" ? 0 : Number(skill2Value),
      Number(slot),
      "マカ"
    );

    const results = searchFrames(p, 100000);

    if (results.length === 0) {
      result.textContent =
`見つかりませんでした

第一スキル: ${skill1Name}
第一スキル値: ${skill1Value}
第二スキル: ${skill2Name || "なし"}
第二スキル値: ${skill2Name ? skill2Value : "なし"}
スロット数: ${slot}
検索範囲: 0 ~ 99999 frame`;
      return;
    }

    result.textContent =
`ヒット件数: ${results.length}

最初のヒット
frame: ${results[0].frame}
時刻換算: ${results[0].watch}

第一スキル: ${skill1Name}
第一スキル値: ${skill1Value}
第二スキル: ${skill2Name || "なし"}
第二スキル値: ${skill2Name ? skill2Value : "なし"}
スロット数: ${slot}`;
  } catch (error) {
    result.textContent = `エラー: ${error.message}`;
    console.error(error);
  }
});
