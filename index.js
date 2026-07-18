const { Telegraf, Markup } = require('telegraf');

// Railway automatically injects the BOT_TOKEN variable
const bot = new Telegraf(process.env.BOT_TOKEN);

// Main Control Keyboard
const mainKeyboard = () => {
  return Markup.keyboard([
    ['📏 Pitch Dimensions', '📕 Complex Rules'],
    ['🖥 VAR Protocols', '❓ Help & Info']
  ]).resize();
};

// Start Entry
bot.start((ctx) => {
  ctx.reply(
    ⚽️ Welcome to the **Football Pitch & Rules Master**, ${ctx.from.first_name || 'Player'}!\n\nI am your interactive offline dictionary for official pitch dimensions and match officiating regulations. Select an option below to clear up any pitch disputes!,
    mainKeyboard()
  );
});

// Pitch Dimensions Module
bot.hears('📏 Pitch Dimensions', (ctx) => {
  ctx.reply(
    'Select a match format to review its standard dimension requirements:',
    Markup.inlineKeyboard([
      [Markup.button.callback('🏟 Standard 11v11 Pitch', 'dim_11v11')],
      [Markup.button.callback('🥅 Mini 7v7 Pitch', 'dim_7v7')],
      [Markup.button.callback('👟 5v5 Futsal Court', 'dim_5v5')]
    ])
  );
});

bot.action('dim_11v11', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(
    '🏟 *Official 11v11 Pitch Dimensions (IFAB Standards):*\n\n' +
    '• Length (Touchline): 90m to 120m (International: 100m to 110m)\n' +
    '• Width (Goal Line): 45m to 90m (International: 64m to 75m)\n' +
    '• Penalty Area: Extends 16.5m from each goalpost outward.\n' +
    '• Official Goal Size: 7.32m wide by 2.44m high.'
  );
});

bot.action('dim_7v7', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(
    '🥅 *Standard 7v7 Pitch Dimensions (Amateur/Youth):*\n\n' +
    '• Length (Touchline): 50m to 60m\n' +
    '• Width (Goal Line): 30m to 40m\n' +
    '• Penalty Area: Extends 9m from the goal line.\n' +
    '• Recommended Goal Size: 4.88m wide by 1.83m high.'
  );
});

bot.action('dim_5v5', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(
    '👟 *Official 5v5 Futsal Court Dimensions:*\n\n' +
    '• Length (Touchline): 25m to 42m\n' +
    '• Width (Goal Line): 16m to 25m\n' +
    '• Penalty Area: A 6m semi-circle radius from the goalposts.\n' +
    '• Official Goal Size: 3.00m wide by 2.00m high.'
  );
});

// Complex Rules Decrypter Module
bot.hears('📕 Complex Rules', (ctx) => {
  ctx.reply(
    'Choose a rule to see its official regulatory criteria:',
    Markup.inlineKeyboard([
      [Markup.button.callback('🏁 The Offside Rule Explained', 'rule_offside')],
      [Markup.button.callback('💥 The Handball Rule Explained', 'rule_handball')]
    ])
  );
});

bot.action('rule_offside', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(
    '🏁 *The Offside Rule (Law 11 Summary):*\n\n' +
    'A player is in an offside position if any part of their head, torso, or feet is in the opponent’s half and closer to the opponent’s goal line than both the ball and the second-last opponent.\n\n' +
    '⚠️ *Note:* Being in an offside position is not an offense on its own. The referee blows the whistle only if the player becomes actively involved in live play.'
  );
});

bot.action('rule_handball', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(
    '💥 *The Handball Rule (Law 12 Summary):*\n\n' +
    'For refereeing criteria, the arm starts at the bottom of the armpit. An offense occurs if a player deliberately touches the ball with their hand/arm, or makes their body unnaturally bigger with their arm position.\n\n' +
    '🏆 *Attacker rule:* If an attacking player scores directly using their arm, it is disallowed instantly—even if accidental.'
  );
});

// VAR Interventions Module
bot.hears('🖥 VAR Protocols', (ctx) => {
  ctx.reply(
    '🖥 *VAR Intervention Criteria:*\n\n' +
    'The Video Assistant Referee can only support the on-pitch referee in four game-changing situations:\n\n' +
    '1. ⚽️ *Goals & Build-up Offenses:* Checking fouls or offsides leading to a goal.\n' +
    '2. 🟥 *Direct Red Cards:* Reviewing serious foul play or violent conduct.\n' +
    '3. 🎯 *Penalty Decisions:* Verifying if a penalty was correctly awarded or denied.\n' +
    '4. 🆔 *Mistaken Identity:* Ensuring the right player receives a yellow or red card.'
  );
});

// Info Help Block
bot.hears('❓ Help & Info', (ctx) => {
  ctx.reply(
    'ℹ️ *How to navigate the Rules Bot:*\n\n' +
    '• Tap 📏 *Pitch Dimensions* for pitch layouts and meter metrics.\n' +
    '• Tap 📕 *Complex Rules* to understand tricky game laws.\n' +
    '• Tap 🖥 *VAR Protocols* to learn match video review limits.',
    mainKeyboard()
  );
});

// Smart Fallback Handling
bot.on('text', (ctx) => {
  ctx.reply('Please use the match official menu options below to inspect the football rules!', mainKeyboard());
});

// Smooth Railway termination cleanup
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch().then(() => {
  console.log('📏 BallKH367 Rules Bot is running live on Railway!');
});
