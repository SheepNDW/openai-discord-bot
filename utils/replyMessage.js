export const replyMessage = () => {
  const errorMessage = ({ status, statusText }) => `對不起，我發生 **${status} - ${statusText}** 錯誤，所以沒有辦法回覆你。`

  return {
    defaultReplyMessage: '等我一下，我正在想要怎麼回覆你...',
    errorMessage,
  }
}
