const messageContainer = document.getElementById('messageContainer');
const updateMessageContainer = ((param) => {
    const li = document.createElement('li');
    li.innerText = param.message;
    messageContainer.appendChild(li);
});

module.exports = {
    updateMessageContainer
};