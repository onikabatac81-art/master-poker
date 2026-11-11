//#region node_modules/.nitro/vite/services/ssr/assets/session-D4g7BORC.js
var SUITS$1 = [
	"S",
	"H",
	"D",
	"C"
];
var RANK_LABELS = {
	11: "J",
	12: "Q",
	13: "K",
	14: "A"
};
function rankLabel(rank) {
	return RANK_LABELS[rank] ?? String(rank);
}
function suitSymbol(suit) {
	return {
		S: "♠",
		H: "♥",
		D: "♦",
		C: "♣"
	}[suit];
}
function isRedSuit(suit) {
	return suit === "H" || suit === "D";
}
function shuffle(items) {
	const result = [...items];
	const random = new Uint32Array(result.length);
	crypto.getRandomValues(random);
	for (let i = result.length - 1; i > 0; i--) {
		const j = random[i] % (i + 1);
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}
function createDeck() {
	const deck = [];
	for (const suit of SUITS$1) for (let rank = 2; rank <= 14; rank++) deck.push({
		rank,
		suit
	});
	return shuffle(deck);
}
var CATEGORY_NAMES = [
	"High Card",
	"One Pair",
	"Two Pair",
	"Three of a Kind",
	"Straight",
	"Flush",
	"Full House",
	"Four of a Kind",
	"Straight Flush"
];
var BASE = 15;
var CATEGORY_WEIGHT = BASE ** 5;
function scoreFive(cards) {
	const counts = /* @__PURE__ */ new Map();
	for (const card of cards) counts.set(card.rank, (counts.get(card.rank) ?? 0) + 1);
	const ranksDesc = cards.map((card) => card.rank).sort((a, b) => b - a);
	const flush = cards.every((card) => card.suit === cards[0].suit);
	const distinct = new Set(ranksDesc).size;
	let straightHigh = 0;
	if (distinct === 5) {
		if (ranksDesc[0] - ranksDesc[4] === 4) straightHigh = ranksDesc[0];
		else if (ranksDesc.join(",") === "14,5,4,3,2") straightHigh = 5;
	}
	const groups = [...counts.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0]);
	const top = groups[0][1];
	const second = groups[1]?.[1] ?? 0;
	let category = 0;
	if (straightHigh && flush) category = 8;
	else if (top === 4) category = 7;
	else if (top === 3 && second === 2) category = 6;
	else if (flush) category = 5;
	else if (straightHigh) category = 4;
	else if (top === 3) category = 3;
	else if (top === 2 && second === 2) category = 2;
	else if (top === 2) category = 1;
	const kickers = straightHigh ? [straightHigh] : groups.map((group) => group[0]);
	while (kickers.length < 5) kickers.push(0);
	return kickers.reduce((value, kicker) => value * BASE + kicker, category * CATEGORY_WEIGHT);
}
function combinations(items, size) {
	if (size === 0) return [[]];
	if (items.length < size) return [];
	const [first, ...rest] = items;
	return [...combinations(rest, size - 1).map((combo) => [first, ...combo]), ...combinations(rest, size)];
}
function evaluateBest(cards) {
	let best = -1;
	for (const combo of combinations(cards, 5)) best = Math.max(best, scoreFive(combo));
	return best;
}
function describeScore(score) {
	return CATEGORY_NAMES[Math.floor(score / CATEGORY_WEIGHT)] ?? "High Card";
}
function emptyTable(config) {
	return {
		seats: Array(8).fill(null),
		dealer: 0,
		hand: null,
		handCount: 0,
		config: config ?? {
			smallBlind: 10,
			bigBlind: 20,
			minBuyIn: 500,
			maxBuyIn: 2e4
		}
	};
}
function cloneTable(table) {
	return {
		...table,
		seats: table.seats.map((seat) => seat ? {
			...seat,
			hole: [...seat.hole]
		} : null),
		hand: table.hand ? {
			...table.hand,
			board: [...table.hand.board],
			deck: [...table.hand.deck],
			winners: [...table.hand.winners]
		} : null
	};
}
function canPlay(seat) {
	return !seat.sittingOut && seat.stack > 0;
}
function nextSeat(seats, from, match) {
	const count = seats.length;
	for (let step = 1; step <= count; step++) {
		const index = (from + step) % count;
		const seat = seats[index];
		if (seat && match(seat)) return index;
	}
	return null;
}
function potTotal(table) {
	if (!table.hand) return 0;
	return table.hand.pot + table.seats.reduce((sum, seat) => sum + (seat?.bet ?? 0), 0);
}
function commit(seat, amount) {
	const paid = Math.min(Math.max(amount, 0), seat.stack);
	seat.stack -= paid;
	seat.bet += paid;
	seat.invested += paid;
	if (seat.stack === 0) seat.allIn = true;
}
function draw(deck) {
	return deck.pop();
}
function dealStreet(hand) {
	const count = hand.street === "preflop" ? 3 : 1;
	for (let i = 0; i < count; i++) hand.board.push(draw(hand.deck));
	if (hand.street === "preflop") hand.street = "flop";
	else if (hand.street === "flop") hand.street = "turn";
	else if (hand.street === "turn") hand.street = "river";
}
function collectBets(table) {
	if (!table.hand) return;
	for (const seat of table.seats) {
		if (!seat) continue;
		table.hand.pot += seat.bet;
		seat.bet = 0;
	}
}
function awardStack(table, awards) {
	for (const award of awards) {
		const seat = table.seats[award.seat];
		if (seat) seat.stack += award.amount;
	}
}
function finishUncontested(table, winnerIndex) {
	if (!table.hand) return table;
	const amount = potTotal(table);
	collectBets(table);
	const awards = [{
		seat: winnerIndex,
		amount,
		label: "Everyone else folded"
	}];
	awardStack(table, awards);
	table.hand.winners = awards;
	table.hand.street = "complete";
	table.hand.toAct = null;
	table.hand.showdown = false;
	return table;
}
function runOutBoard(hand) {
	while (hand.board.length < 5) hand.board.push(draw(hand.deck));
}
function showdown(table) {
	if (!table.hand) return table;
	const hand = table.hand;
	const live = table.seats.flatMap((seat, index) => seat && !seat.folded ? [index] : []);
	const levels = [...new Set(table.seats.map((seat) => seat?.invested ?? 0).filter((v) => v > 0))].sort((a, b) => a - b);
	const awards = [];
	let previous = 0;
	let rakeTotal = 0;
	for (const level of levels) {
		const amount = table.seats.reduce((sum, seat) => {
			if (!seat) return sum;
			return sum + Math.max(0, Math.min(seat.invested, level) - previous);
		}, 0);
		previous = level;
		if (amount <= 0) continue;
		const contenders = live.filter((index) => (table.seats[index]?.invested ?? 0) >= level);
		const eligible = contenders.length > 0 ? contenders : live;
		const take = Math.floor(amount * hand.rakePercent / 100);
		rakeTotal += take;
		const distributable = amount - take;
		const scored = eligible.map((index) => {
			const seat = table.seats[index];
			return {
				index,
				score: seat ? evaluateBest([...seat.hole, ...hand.board]) : -1
			};
		});
		const best = Math.max(...scored.map((entry) => entry.score));
		const winners = scored.filter((entry) => entry.score === best).map((entry) => entry.index);
		const share = Math.floor(distributable / winners.length);
		const remainder = distributable - share * winners.length;
		winners.forEach((index, position) => {
			awards.push({
				seat: index,
				amount: share + (position === 0 ? remainder : 0),
				label: describeScore(best)
			});
		});
	}
	collectBets(table);
	awardStack(table, awards);
	hand.rake = rakeTotal;
	hand.winners = awards;
	hand.showdown = true;
	hand.street = "complete";
	hand.toAct = null;
	return table;
}
var needsAction = (seat, currentBet) => !seat.folded && !seat.allIn && (!seat.acted || seat.bet < currentBet);
function advance(table, from) {
	const hand = table.hand;
	if (!hand) return table;
	const bigBlind = table.config.bigBlind;
	for (;;) {
		const live = table.seats.flatMap((seat, index) => seat && !seat.folded ? [index] : []);
		if (live.length === 1) return finishUncontested(table, live[0]);
		if (table.seats.some((seat) => seat && needsAction(seat, hand.currentBet))) {
			hand.toAct = nextSeat(table.seats, from, (seat) => needsAction(seat, hand.currentBet));
			return table;
		}
		if (hand.street === "river") return showdown(table);
		collectBets(table);
		dealStreet(hand);
		hand.currentBet = 0;
		hand.minRaise = bigBlind;
		for (const seat of table.seats) if (seat) seat.acted = false;
		from = table.dealer;
		if (table.seats.filter((seat) => seat && !seat.folded && !seat.allIn).length < 2) {
			collectBets(table);
			runOutBoard(hand);
			return showdown(table);
		}
	}
}
function startHand(table, rakePercent) {
	const next = cloneTable(table);
	const sb = table.config.smallBlind;
	const bb = table.config.bigBlind;
	next.seats = next.seats.map((seat) => seat ? {
		...seat,
		bet: 0,
		invested: 0,
		hole: [],
		folded: !canPlay(seat),
		allIn: false,
		acted: false
	} : null);
	const playable = next.seats.filter((seat) => !!seat && canPlay(seat)).length;
	if (playable < 2) return table;
	const dealer = nextSeat(next.seats, table.dealer, canPlay) ?? table.dealer;
	const smallBlindSeat = playable === 2 ? dealer : nextSeat(next.seats, dealer, canPlay) ?? dealer;
	const bigBlindSeat = nextSeat(next.seats, smallBlindSeat, canPlay) ?? smallBlindSeat;
	const deck = createDeck();
	for (let round = 0; round < 2; round++) {
		let index = dealer;
		for (let step = 0; step < playable; step++) {
			const seatIndex = nextSeat(next.seats, index, canPlay);
			if (seatIndex === null) break;
			const seat = next.seats[seatIndex];
			if (seat) seat.hole.push(draw(deck));
			index = seatIndex;
		}
	}
	const sbSeat = next.seats[smallBlindSeat];
	const bbSeat = next.seats[bigBlindSeat];
	if (sbSeat) commit(sbSeat, sb);
	if (bbSeat) commit(bbSeat, bb);
	const currentBet = Math.max(...next.seats.map((seat) => seat?.bet ?? 0));
	const firstActor = nextSeat(next.seats, bigBlindSeat, (seat) => !seat.folded && !seat.allIn);
	next.dealer = dealer;
	next.handCount = table.handCount + 1;
	next.hand = {
		number: next.handCount,
		street: "preflop",
		board: [],
		deck,
		pot: 0,
		currentBet,
		minRaise: bb,
		toAct: firstActor,
		winners: [],
		rake: 0,
		rakePercent,
		showdown: false
	};
	return advance(next, bigBlindSeat);
}
function legalActions(table, index) {
	const hand = table.hand;
	const seat = table.seats[index];
	if (!hand || !seat || hand.toAct !== index) return null;
	const maxTo = seat.bet + seat.stack;
	const minTo = Math.min(hand.currentBet + hand.minRaise, maxTo);
	return {
		toCall: hand.currentBet - seat.bet,
		canCheck: hand.currentBet - seat.bet === 0,
		canRaise: maxTo > hand.currentBet,
		minTo,
		maxTo
	};
}
function applyAction(table, index, action) {
	const legal = legalActions(table, index);
	if (!legal) return table;
	const next = cloneTable(table);
	const hand = next.hand;
	const seat = next.seats[index];
	if (!hand || !seat) return table;
	if (action.type === "fold") {
		seat.folded = true;
		seat.acted = true;
	} else if (action.type === "check") {
		if (!legal.canCheck) return table;
		seat.acted = true;
	} else if (action.type === "call") {
		commit(seat, hand.currentBet - seat.bet);
		seat.acted = true;
	} else {
		const target = action.to;
		if (!legal.canRaise || target > legal.maxTo) return table;
		if (target < legal.minTo && target !== legal.maxTo) return table;
		if (target <= hand.currentBet && target !== legal.maxTo) return table;
		const increment = target - hand.currentBet;
		commit(seat, target - seat.bet);
		seat.acted = true;
		if (increment >= hand.minRaise) {
			hand.minRaise = increment;
			for (const other of next.seats) if (other && other !== seat) other.acted = false;
		}
		hand.currentBet = Math.max(hand.currentBet, seat.bet);
	}
	return advance(next, index);
}
var ariana_default = "/assets/ariana-DTSakeZM.jpg";
var mateo_default = "/assets/mateo-CCE3u0ZE.jpg";
var kenji_default = "/assets/kenji-RoP1y25s.jpg";
var sofia_default = "/assets/sofia-Dvaf7j8B.jpg";
var dante_default = "/assets/dante-CE8Hmdz_.jpg";
var yuna_default = "/assets/yuna-CimfwpZ2.jpg";
var leo_default = "/assets/leo-CvGoVf6h.jpg";
var priya_default = "/assets/priya-nCW_VR_t.jpg";
var viktor_default = "/assets/viktor-CEm51TWr.jpg";
var mei_default = "/assets/mei-Ca4uN962.jpg";
var diego_default = "/assets/diego-CcB6iSy0.jpg";
var zara_default = "/assets/zara-DEt1EHNy.jpg";
var FEMALE = [
	"Mae",
	"Joy",
	"Kristine",
	"Aira",
	"Bea",
	"Jhen",
	"Trixie",
	"Camille",
	"Liza",
	"Shaira",
	"Nikki",
	"Angel",
	"Rhea",
	"Faye",
	"Lovely",
	"Janelle",
	"Pia",
	"Kaye",
	"Mika",
	"Hazel",
	"Ivy",
	"Rina",
	"Cheska",
	"Denise",
	"Yuki",
	"Sakura",
	"Ana",
	"Lucia",
	"Nadia",
	"Leah",
	"Tess",
	"Grace",
	"Monique",
	"Aiko",
	"Carla",
	"Dina"
];
var MALE = [
	"Jhun",
	"Rommel",
	"Mark",
	"Paolo",
	"Carlo",
	"Kevin",
	"Ryan",
	"Bong",
	"Jomar",
	"Arnel",
	"Migs",
	"Jepoy",
	"Rico",
	"Dennis",
	"Noel",
	"Jayson",
	"Ervin",
	"Ramil",
	"Bryan",
	"Gelo",
	"Marvin",
	"Jun",
	"Toto",
	"Raffy",
	"Hiro",
	"Takeshi",
	"Luis",
	"Marco",
	"Andrei",
	"Ivan",
	"Rafael",
	"Nico",
	"Enzo",
	"Kenzo",
	"Dong",
	"Alvin"
];
var SURNAME_INITIALS = "ABCDGLMRSTVY";
var POKER_WORDS = [
	"Ace",
	"River",
	"AllIn",
	"Bluff",
	"Royal",
	"Flush",
	"Kings",
	"Pocket",
	"Nuts",
	"Chip",
	"Turn",
	"Lucky"
];
var TAGS = [
	"ph",
	"mnl",
	"ceb",
	"dvo",
	"qc",
	"pro",
	"x"
];
function pick(list, rng) {
	return list[Math.floor(rng() * list.length) % list.length];
}
function digits(rng) {
	return pick([
		() => String(Math.floor(rng() * 90) + 10),
		() => String(Math.floor(rng() * 30) + 85).slice(-2),
		() => "0" + Math.floor(rng() * 9 + 1)
	], rng)();
}
/** One screen name, e.g. "Jhen_23", "Paolo D.", "RiverMigs", "kaye.ceb", "ACE_RICO". */
function randomBotName(gender, rng = Math.random) {
	const first = pick(gender === "f" ? FEMALE : MALE, rng);
	return pick([
		() => first,
		() => `${first} ${pick([...SURNAME_INITIALS], rng)}.`,
		() => `${first}${digits(rng)}`,
		() => `${first}_${digits(rng)}`,
		() => `${first.toLowerCase()}.${pick(TAGS, rng)}`,
		() => `${pick(POKER_WORDS, rng)}${first}`,
		() => `${pick(POKER_WORDS, rng).toUpperCase()}_${first.toUpperCase()}`,
		() => `${first}${pick(POKER_WORDS, rng)}`
	], rng)();
}
/** A name not already used at the table (case-insensitive). */
function uniqueBotName(gender, taken, rng = Math.random) {
	const used = new Set([...taken].map((name) => name.toLowerCase()));
	for (let attempt = 0; attempt < 40; attempt++) {
		const name = randomBotName(gender, rng);
		if (!used.has(name.toLowerCase())) return name;
	}
	let n = 2;
	const base = randomBotName(gender, rng);
	while (used.has(`${base}${n}`.toLowerCase())) n++;
	return `${base}${n}`;
}
var BOT_ROSTER = [
	{
		key: "ariana",
		name: "Ariana",
		gender: "f",
		tone: 0,
		emoji: "🦊",
		avatarUrl: ariana_default
	},
	{
		key: "mateo",
		name: "Mateo",
		gender: "m",
		tone: 1,
		emoji: "🐺",
		avatarUrl: mateo_default
	},
	{
		key: "kenji",
		name: "Kenji",
		gender: "m",
		tone: 2,
		emoji: "🐉",
		avatarUrl: kenji_default
	},
	{
		key: "sofia",
		name: "Sofia",
		gender: "f",
		tone: 3,
		emoji: "🦁",
		avatarUrl: sofia_default
	},
	{
		key: "dante",
		name: "Dante",
		gender: "m",
		tone: 4,
		emoji: "🦈",
		avatarUrl: dante_default
	},
	{
		key: "yuna",
		name: "Yuna",
		gender: "f",
		tone: 5,
		emoji: "🦅",
		avatarUrl: yuna_default
	},
	{
		key: "leo",
		name: "Leo",
		gender: "m",
		tone: 6,
		emoji: "🐅",
		avatarUrl: leo_default
	},
	{
		key: "priya",
		name: "Priya",
		gender: "f",
		tone: 7,
		emoji: "🦝",
		avatarUrl: priya_default
	},
	{
		key: "viktor",
		name: "Viktor",
		gender: "m",
		tone: 0,
		emoji: "🐻",
		avatarUrl: viktor_default
	},
	{
		key: "mei",
		name: "Mei",
		gender: "f",
		tone: 1,
		emoji: "🦄",
		avatarUrl: mei_default
	},
	{
		key: "diego",
		name: "Diego",
		gender: "m",
		tone: 2,
		emoji: "🐊",
		avatarUrl: diego_default
	},
	{
		key: "zara",
		name: "Zara",
		gender: "f",
		tone: 3,
		emoji: "🦜",
		avatarUrl: zara_default
	}
];
function randomBotStack(minBuyIn) {
	const min = Math.max(minBuyIn, minBuyIn);
	const max = Math.round(minBuyIn * 3);
	const span = Math.max(1, (max - min) / 10);
	return min + Math.floor(Math.random() * span) * 10;
}
function createHumanSeat(id, name, stack, tone, avatarUrl, avatarEmoji) {
	return {
		id,
		name,
		isBot: false,
		isMe: true,
		tone,
		stack,
		bet: 0,
		invested: 0,
		hole: [],
		folded: false,
		allIn: false,
		acted: false,
		sittingOut: false,
		avatarUrl,
		avatarEmoji
	};
}
function createBotSeat(bot, name, minBuyIn) {
	return {
		id: `bot-${bot.key}-${Math.random().toString(36).slice(2, 7)}`,
		name,
		isBot: true,
		isMe: false,
		tone: bot.tone,
		stack: randomBotStack(minBuyIn),
		bet: 0,
		invested: 0,
		hole: [],
		folded: false,
		allIn: false,
		acted: false,
		sittingOut: false,
		avatarUrl: bot.avatarUrl,
		avatarEmoji: bot.emoji,
		photoKey: bot.key
	};
}
function createRemoteSeat(player, tone) {
	return {
		id: player.id,
		name: player.name,
		isBot: false,
		isMe: false,
		tone,
		stack: 0,
		bet: 0,
		invested: 0,
		hole: [],
		folded: true,
		allIn: false,
		acted: false,
		sittingOut: true,
		avatarUrl: player.avatarUrl,
		avatarEmoji: player.avatarEmoji
	};
}
function firstEmptySeat(seats) {
	return seats.findIndex((seat) => seat === null);
}
function lastBotSeat(seats) {
	for (let index = seats.length - 1; index >= 0; index--) if (seats[index]?.isBot) return index;
	return -1;
}
function seatPhotoKey(seat) {
	return seat.photoKey ?? BOT_ROSTER.find((bot) => bot.name === seat.name)?.key;
}
/** A photo nobody at the table is using, plus a fresh random name nobody at the table has. */
function pickBot(seats) {
	const usedPhotos = new Set(seats.flatMap((seat) => seat?.isBot ? [seatPhotoKey(seat)] : []));
	const available = BOT_ROSTER.filter((bot) => !usedPhotos.has(bot.key));
	const pool = available.length > 0 ? available : BOT_ROSTER;
	const bot = pool[Math.floor(Math.random() * pool.length)];
	const takenNames = seats.flatMap((seat) => seat ? [seat.name] : []);
	return {
		bot,
		name: uniqueBotName(bot.gender, takenNames)
	};
}
/** Shrinks tables saved with more than SEAT_COUNT seats, keeping real players and dropping AI players first. */
function fitToSeatCount(seats) {
	if (seats.length <= 8) return seats;
	const fitted = seats.slice(0, 8);
	for (const extra of seats.slice(8)) {
		if (!extra || extra.isBot) continue;
		let slot = fitted.findIndex((seat) => seat === null);
		if (slot === -1) slot = lastBotSeat(fitted);
		if (slot !== -1) fitted[slot] = extra;
	}
	return fitted;
}
function reconcileSeats(table, remotes) {
	const seats = fitToSeatCount(table.seats).map((seat) => seat ? {
		...seat,
		hole: []
	} : null);
	const remoteIds = new Set(remotes.map((player) => player.id));
	const minBuyIn = table.config.minBuyIn;
	seats.forEach((seat, index) => {
		if (seat && !seat.isBot && !seat.isMe && !remoteIds.has(seat.id)) seats[index] = null;
	});
	const seatedRemoteIds = new Set(seats.flatMap((seat) => seat && !seat.isBot && !seat.isMe ? [seat.id] : []));
	for (const player of remotes) {
		if (seatedRemoteIds.has(player.id)) continue;
		let slot = firstEmptySeat(seats);
		if (slot === -1) {
			const bot = lastBotSeat(seats);
			if (bot === -1) break;
			seats[bot] = null;
			slot = bot;
		}
		seats[slot] = createRemoteSeat(player, slot);
	}
	const humanCount = seats.filter((seat) => seat && !seat.isBot).length;
	const targetBots = Math.max(0, 8 - humanCount);
	let botCount = seats.filter((seat) => seat?.isBot).length;
	while (botCount > targetBots) {
		const bot = lastBotSeat(seats);
		if (bot === -1) break;
		seats[bot] = null;
		botCount--;
	}
	while (botCount < targetBots) {
		const slot = firstEmptySeat(seats);
		if (slot === -1) break;
		const { bot, name } = pickBot(seats);
		seats[slot] = createBotSeat(bot, name, minBuyIn);
		botCount++;
	}
	const rosterPhotos = new Map(BOT_ROSTER.map((bot) => [bot.key, bot.avatarUrl]));
	for (const seat of seats) {
		if (seat?.isBot && seat.stack < table.config.bigBlind * 5) seat.stack = randomBotStack(minBuyIn);
		if (seat?.isBot) {
			const legacy = !seat.photoKey ? BOT_ROSTER.find((bot) => bot.name === seat.name) : void 0;
			if (legacy) {
				seat.photoKey = legacy.key;
				seat.name = uniqueBotName(legacy.gender, seats.flatMap((other) => other && other !== seat ? [other.name] : []));
			}
			const key = seatPhotoKey(seat);
			if (key) seat.avatarUrl = rosterPhotos.get(key) ?? seat.avatarUrl;
		}
	}
	const dealer = table.dealer < seats.length ? table.dealer : 0;
	return {
		...table,
		seats,
		dealer
	};
}
var SUITS = [
	"S",
	"H",
	"D",
	"C"
];
var EQUITY_SAMPLES = 120;
function unseenCards(known) {
	const taken = new Set(known.map((card) => `${card.rank}${card.suit}`));
	const cards = [];
	for (const suit of SUITS) for (let rank = 2; rank <= 14; rank++) if (!taken.has(`${rank}${suit}`)) cards.push({
		rank,
		suit
	});
	return cards;
}
function estimateEquity(hole, board, opponents) {
	if (hole.length < 2) return 0;
	if (opponents <= 0) return 1;
	const pool = unseenCards([...hole, ...board]);
	const boardNeeded = 5 - board.length;
	let points = 0;
	for (let sample = 0; sample < EQUITY_SAMPLES; sample++) {
		const deck = [...pool];
		const needed = boardNeeded + opponents * 2;
		for (let index = 0; index < needed; index++) {
			const swap = index + Math.floor(Math.random() * (deck.length - index));
			[deck[index], deck[swap]] = [deck[swap], deck[index]];
		}
		let cursor = 0;
		const fullBoard = [...board];
		while (fullBoard.length < 5) fullBoard.push(deck[cursor++]);
		const mine = evaluateBest([...hole, ...fullBoard]);
		let rival = -1;
		for (let opponent = 0; opponent < opponents; opponent++) {
			const score = evaluateBest([
				deck[cursor],
				deck[cursor + 1],
				...fullBoard
			]);
			cursor += 2;
			rival = Math.max(rival, score);
		}
		if (mine > rival) points += 1;
		else if (mine === rival) points += .5;
	}
	return points / EQUITY_SAMPLES;
}
var PROFILES = {
	passive: {
		valueBetChance: .45,
		bluffChance: .03,
		callMargin: .08,
		betFraction: .5
	},
	balanced: {
		valueBetChance: .7,
		bluffChance: .08,
		callMargin: .03,
		betFraction: .66
	},
	aggressive: {
		valueBetChance: .9,
		bluffChance: .2,
		callMargin: -.02,
		betFraction: .85
	}
};
var BOT_SKILLS = {
	easy: {
		noise: .3,
		valueBet: .55,
		bluff: .35,
		callMarginShift: -.08
	},
	normal: {
		noise: .06,
		valueBet: 1,
		bluff: 1,
		callMarginShift: 0
	},
	hard: {
		noise: .02,
		valueBet: 1.15,
		bluff: 1.25,
		callMarginShift: .02
	}
};
function temperament(seat) {
	return .85 + seat.tone * 37 % 10 / 25;
}
function sizedTarget(table, legal, fraction) {
	const hand = table.hand;
	if (!hand) return legal.minTo;
	const pot = potTotal(table);
	const size = (hand.currentBet > 0 ? hand.currentBet * 2.5 : 0) + pot * fraction;
	return Math.round(Math.min(legal.maxTo, Math.max(legal.minTo, size)));
}
function liveOpponents(table, index) {
	return table.seats.filter((seat, position) => position !== index && seat && !seat.folded && !seat.sittingOut).length;
}
/**
* Admin-set player winning rate (50 = neutral). Lower rates make bots call tighter, bet their
* strong hands harder and fold marginal spots so players lose more; higher rates loosen bots
* up so players win more. Shifts stay inside sane bounds so bots never play nonsensically.
*/
function winRateCallMarginShift(winRate) {
	return (50 - Math.min(Math.max(Number.isFinite(winRate) ? winRate : 50, 0), 100)) / 500;
}
function winRateNoise(winRate) {
	return (Math.min(Math.max(Number.isFinite(winRate) ? winRate : 50, 0), 100) - 50) / 250;
}
function chooseBotAction(table, index, aggression, level = "normal", winRate = 50) {
	const legal = legalActions(table, index);
	const seat = table.seats[index];
	const hand = table.hand;
	if (!legal || !seat || !hand) return { type: "fold" };
	const opponents = liveOpponents(table, index);
	if (opponents === 0) return legal.canCheck ? { type: "check" } : { type: "call" };
	const skill = BOT_SKILLS[level];
	const base = PROFILES[aggression];
	const marginShift = winRateCallMarginShift(winRate);
	const profile = {
		valueBetChance: Math.min(1, base.valueBetChance * skill.valueBet),
		bluffChance: base.bluffChance * skill.bluff,
		callMargin: base.callMargin + skill.callMarginShift + marginShift,
		betFraction: base.betFraction
	};
	const style = temperament(seat);
	const equity = estimateEquity(seat.hole, hand.board, opponents) + (Math.random() - .5) * (skill.noise + winRateNoise(winRate));
	const pot = potTotal(table);
	if (legal.toCall > 0) {
		const potOdds = legal.toCall / (pot + legal.toCall);
		const committed = legal.toCall / Math.max(1, seat.stack + seat.bet);
		const strong = equity > Math.min(Math.max(.72 - (style - 1) * .1 + marginShift * 2, .4), .95);
		if (legal.canRaise && strong && Math.random() < profile.valueBetChance * style) return {
			type: "raise",
			to: sizedTarget(table, legal, profile.betFraction)
		};
		if (legal.canRaise && equity < .3 && Math.random() < profile.bluffChance * style) return {
			type: "raise",
			to: sizedTarget(table, legal, profile.betFraction)
		};
		if (equity >= potOdds + profile.callMargin * style) {
			if (committed > .5 && equity < .7) return { type: "fold" };
			return { type: "call" };
		}
		if (Math.random() < profile.bluffChance && committed < .1) return { type: "call" };
		return { type: "fold" };
	}
	const value = equity * style;
	if (legal.canRaise && value > .6 && Math.random() < profile.valueBetChance) return {
		type: "raise",
		to: sizedTarget(table, legal, profile.betFraction * (.8 + Math.random() * .4))
	};
	if (legal.canRaise && value < .35 && Math.random() < profile.bluffChance) return {
		type: "raise",
		to: sizedTarget(table, legal, profile.betFraction)
	};
	return { type: "check" };
}
var BOT_LEVELS = [
	"easy",
	"normal",
	"hard"
];
var NEXT_HAND_DELAY_MS = 2e3;
var RESULT_DISPLAY_MS = 9e3;
var BOT_MIN_THINK_MS = 2500;
function isBotLevel(value) {
	return typeof value === "string" && BOT_LEVELS.includes(value);
}
/** The bot skill fixed for a table by the admin. Players never choose it. */
function tableBotLevel(value) {
	return isBotLevel(value) ? value : "normal";
}
/** A table's own rake wins over the house default; both are clamped to 0-20%. */
function effectiveRake(tableRake, houseRake) {
	const value = tableRake === null || tableRake === void 0 || !Number.isFinite(Number(tableRake)) ? houseRake : Number(tableRake);
	return Math.min(Math.max(value, 0), 20);
}
function myIndex(table) {
	return table.seats.findIndex((seat) => seat?.isMe);
}
function myStack(table) {
	return table.seats.find((seat) => seat?.isMe)?.stack ?? 0;
}
/** Milliseconds to wait before the next automatic step. */
function delayFor(table) {
	const hand = table.hand;
	if (!hand) return NEXT_HAND_DELAY_MS;
	if (hand.street === "complete") return RESULT_DISPLAY_MS;
	if (hand.toAct === null) return NEXT_HAND_DELAY_MS;
	if (table.seats[hand.toAct]?.isBot) return BOT_MIN_THINK_MS + Math.random() * 3e3;
	return 3e4;
}
/** One automatic step: deal the next hand, clear a result, play a bot, or time out the player. */
function autoStep(table, remotes, rules) {
	const hand = table.hand;
	if (!hand) {
		if (myStack(table) <= 0) return { kind: "bust" };
		return {
			kind: "table",
			table: startHand(reconcileSeats(table, remotes), rules.rakePercent)
		};
	}
	if (hand.street === "complete") return {
		kind: "table",
		table: {
			...table,
			hand: null
		}
	};
	if (hand.toAct === null) return {
		kind: "table",
		table
	};
	const index = hand.toAct;
	if (table.seats[index]?.isBot) return {
		kind: "table",
		table: applyAction(table, index, chooseBotAction(table, index, rules.botAggression, rules.botLevel ?? "normal", rules.winRate))
	};
	return {
		kind: "table",
		table: applyAction(table, index, legalActions(table, index)?.canCheck ? { type: "check" } : { type: "fold" })
	};
}
/**
* Settle the player's seat for leaving: fold a live hand (chips already in the pot stay there),
* or, when the player is all-in, play the hand out instantly so they get what they win.
* Returns the final chip count to cash out.
*/
function settleForExit(table, rules) {
	let current = table;
	const me = myIndex(current);
	if (me === -1) return 0;
	const hand = current.hand;
	if (!hand || hand.street === "complete") return myStack(current);
	const seat = current.seats[me];
	if (!seat.folded && !seat.allIn) {
		if (hand.toAct === me) current = applyAction(current, me, { type: "fold" });
		else current = {
			...current,
			seats: current.seats.map((s, i) => i === me && s ? {
				...s,
				folded: true,
				acted: true
			} : s)
		};
		return myStack(current);
	}
	for (let guard = 0; guard < 200; guard++) {
		const h = current.hand;
		if (!h || h.street === "complete" || h.toAct === null) break;
		const step = autoStep(current, [], rules);
		if (step.kind !== "table" || step.table === current) break;
		current = step.table;
	}
	return myStack(current);
}
var HIDDEN_CARD = {
	rank: 2,
	suit: "S"
};
/** What the player is allowed to see: no deck, no opponents' hole cards before showdown. */
function redactFor(table) {
	const hand = table.hand;
	const reveal = !!hand && hand.street === "complete" && hand.showdown;
	return {
		...table,
		seats: table.seats.map((seat) => {
			if (!seat || seat.isMe) return seat;
			if (reveal && !seat.folded) return seat;
			return {
				...seat,
				hole: seat.hole.map(() => HIDDEN_CARD)
			};
		}),
		hand: hand ? {
			...hand,
			deck: []
		} : null
	};
}
function isValidAction(value) {
	if (!value || typeof value !== "object") return false;
	const action = value;
	if (action.type === "fold" || action.type === "check" || action.type === "call") return true;
	return action.type === "raise" && typeof action.to === "number" && Number.isFinite(action.to) && action.to > 0;
}
//#endregion
export { uniqueBotName as C, tableBotLevel as S, reconcileSeats as _, chooseBotAction as a, startHand as b, effectiveRake as c, isRedSuit as d, isValidAction as f, rankLabel as g, potTotal as h, autoStep as i, emptyTable as l, myIndex as m, BOT_ROSTER as n, createHumanSeat as o, legalActions as p, applyAction as r, delayFor as s, BOT_LEVELS as t, isBotLevel as u, redactFor as v, suitSymbol as x, settleForExit as y };
