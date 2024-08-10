const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  _id: { type: String, required: true },
  username: { type: String, required: true },
  discriminator: { type: String, required: true },
  watchlist: [{ title: { type: String, required: true } }],
  preferredService: { type: String, default: 'crunchyroll' },
  playbackSpeed: { type: Number, default: 1.0 },
  autoplay: { type: Boolean, default: false },
  volume: { type: Number, default: 50 },
  customCommands: [{ name: { type: String, required: true }, response: { type: String, required: true } }],
  animeChannels: [{ type: Schema.Types.ObjectId, ref: 'AnimeChannel' }],
});

const User = model('User', userSchema);

async function getUser(userId) {
  try {
    return await User.findById(userId);
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

async function updateUser(userId, userData) {
  try {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

async function createCustomCommand(userId, commandName, commandResponse) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found.');
    }

    const existingCommand = user.customCommands.find((cmd) => cmd.name === commandName);

    if (existingCommand) {
      throw new Error(`A custom command with the name "${commandName}" already exists.`);
    }

    user.customCommands.push({ name: commandName, response: commandResponse });
    await user.save();
  } catch (error) {
    console.error('Error creating custom command:', error);
    throw error;
  }
}

async function getCustomCommand(userId, commandName) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      return null;
    }

    return user.customCommands.find((cmd) => cmd.name === commandName);
  } catch (error) {
    console.error('Error getting custom command:', error);
    throw error;
  }
}

async function executeCustomCommand(message, customCommand, args) {
  try {
    const response = customCommand.response.replace(/%args%/gi, args.join(' '));
    await message.reply(response);
  } catch (error) {
    console.error('Error executing custom command:', error);
    await message.reply('An error occurred while executing the custom command.');
  }
}

module.exports = {
  getUser,
  updateUser,
  createCustomCommand,
  getCustomCommand,
  executeCustomCommand,
};