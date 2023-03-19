export const mergeMessages = (messages1, messages2) => {
    const combinedMessages = [...messages1, ...messages2];
    const uniqueMessages = [];

    combinedMessages.forEach((message) => {
      if (
        !uniqueMessages.some((uniqueMessage) => uniqueMessage.id === message.id)
      ) {
        uniqueMessages.push(message);
      }
    });

    uniqueMessages.sort((a, b) => {
      if (a.timestamp && b.timestamp) {
        return a.timestamp.toMillis() - b.timestamp.toMillis();
      } else {
        return 0;
      }
    });

    return uniqueMessages;
  };