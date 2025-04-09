import ajarakanIcon from './ajarakan.png'
import anjanathgIcon from './anjanathg.png'
import arkveldgIcon from './arkveldg.png'
import arkveldIcon from './arkveld.png'
import balaharaIcon from './balahara.png'
import barinaIcon from './barina.png'
import blangongaIcon from './blangonga.png'
import chatacabraIcon from './chatacabra.png'
import congalalaIcon from './congalala.png'
import dahaadIcon from './dahaad.png'
import doshagumagIcon from './doshagumag.png'
import doshagumaIcon from './doshaguma.png'
import doshIcon from './dosh.png'
import dunaIcon from './duna.png'
import goreIcon from './gore.png'
import graviosIcon from './gravios.png'
import gypcerosIcon from './gypceros.png'
import hirabamiIcon from './hirabami.png'
import mizutsuneIcon from './mizutsune.png'
import nerscyllaIcon from './nerscylla.png'
import odogarongIcon from './odogarong.png'
import rathalosgIcon from './rathalosg.png'
import rathalosIcon from './rathalos.png'
import rathianIcon from './rathian.png'
import reyIcon from './rey.png'
import rompopoloIcon from './rompopolo.png'
import shiaIcon from './shia.png'
import udraIcon from './udra.png'
import xuIcon from './xu.png'
import yianIcon from './yian.png'

export interface Monster {
  name: string
  score: number
  icon: string
}

export const monsterIcons: Record<string, string> = {
  Ajarakan: ajarakanIcon,
  'Guardian Fulgur Anjanath': anjanathgIcon,
  'Guardian Arkveld': arkveldgIcon,
  Arkveld: arkveldIcon,
  Balahara: balaharaIcon,
  'Lala Barina': barinaIcon,
  Blangonga: blangongaIcon,
  Chatacabra: chatacabraIcon,
  Congalala: congalalaIcon,
  'Jin Dahaad': dahaadIcon,
  'Guardian Doshaguma': doshagumagIcon,
  'Doshaguma Alpha': doshagumaIcon,
  Doshaguma: doshIcon,
  'Uth Duna': dunaIcon,
  'Gore Magala': goreIcon,
  Gravios: graviosIcon,
  Gypceros: gypcerosIcon,
  Hirabami: hirabamiIcon,
  Mizutsune: mizutsuneIcon,
  Nerscylla: nerscyllaIcon,
  'Guardian Disaster Odogaron': odogarongIcon,
  Rathalos: rathalosIcon,
  'Guardian Rathalos': rathalosgIcon,
  Rathian: rathianIcon,
  'Rey Dau': reyIcon,
  Rompopolo: rompopoloIcon,
  'Zoh Shia': shiaIcon,
  'Nu Udra': udraIcon,
  'Xu Wu': xuIcon,
  'Yian Kut-Ku': yianIcon,
}

export const monsters: Monster[] = Object.entries({
    Arkveld: 65,
    'Doshaguma Alpha': 72,
    Quematrice: 85,
    'Zoh Shia': 95,
    'Guardian Rathalos': 90,
    Chatacabra: 58,
    'Gore Magala': 98,
    Ajarakan: 62,
    'Guardian Fulgur Anjanath': 88,
    'Guardian Arkveld': 93,
    Balahara: 50,
    'Lala Barina': 52,
    Blangonga: 63,
    Congalala: 46,
    'Jin Dahaad': 79,
    Doshaguma: 68,
    'Uth Duna': 70,
    Gravios: 82,
    Gypceros: 48,
    Hirabami: 55,
    Mizutsune: 77,
    Nerscylla: 66,
    'Guardian Disaster Odogaron': 92,
    Rathian: 75,
    'Rey Dau': 57,
    Rompopolo: 53,
    'Nu Udra': 60,
    'Xu Wu': 42,
    'Yian Kut-Ku': 44,
  }).map(([name, score]) => ({
    name,
    score,
    icon: monsterIcons[name] ?? null,
  }))
  
  export const getRandomMonster = () => monsters[Math.floor(Math.random() * monsters.length)]
