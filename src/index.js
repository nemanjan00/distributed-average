const URL = require("url").URL;

const protocols = {
	redis: require("./backends/redis"),
	memory: require("./backends/memory")
};

module.exports = (url) => {
	const parsedUrl = new URL(url);

	const protocol = parsedUrl.protocol.split(":").join("");

	return (protocols[protocol] || protocols["memory"])(url);
};
