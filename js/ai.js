// ==================== AI 问答功能 ====================
// 注意：此 API Key 仅用于演示，实际生产环境必须移至后端！
const DEEPSEEK_API_KEY = 'YOUR_DEEPSEEK_API_KEY';  // 请替换
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_SYSTEM_PROMPT = `你是一个专业的广元旅游助手，名叫"蜀道智慧助手"。热情、耐心地回答用户关于广元旅游的所有问题。`;

let aiMessages = [];

// 添加AI消息到对话框
function addAIMessage(role, content) {
    const body = document.getElementById('aiDialogBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${role}`;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    messageDiv.innerHTML = `<div class="bubble">${content.replace(/\n/g, '<br>')}</div><div class="time">${time}</div>`;
    body.appendChild(messageDiv);
    body.scrollTop = body.scrollHeight;
    aiMessages.push({ role: role === 'user' ? 'user' : 'assistant', content: content });
}

// 显示打字指示器
function showTypingIndicator() {
    const body = document.getElementById('aiDialogBody');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-message assistant';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<div class="bubble"><div class="ai-typing"><span></span><span></span><span></span></div></div>';
    body.appendChild(typingDiv);
    body.scrollTop = body.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

// 显示API状态
function showApiStatus(text, isOnline) {
    const status = document.getElementById('apiStatus');
    const dot = document.getElementById('apiStatusDot');
    const txt = document.getElementById('apiStatusText');
    if (status && dot && txt) {
        txt.textContent = text;
        dot.className = 'dot' + (isOnline ? '' : ' offline');
        status.classList.add('show');
        setTimeout(() => status.classList.remove('show'), 3000);
    }
}

// 本地智能回答（降级方案）
function getSmartLocalAnswer(question) {
    const lowerQ = question.toLowerCase();
    if (lowerQ.includes('老人') && lowerQ.includes('一天')) return "带老人一日游推荐：皇泽寺 → 千佛崖 → 昭化古城，平缓不累。";
    if (lowerQ.includes('美食') || lowerQ.includes('好吃')) return "推荐：女皇蒸凉面、剑门关豆腐宴、核桃饼。";
    if (lowerQ.includes('剑门关')) {
        if (lowerQ.includes('门票')) return "剑门关门票105元，开放时间08:00-17:30。";
        if (lowerQ.includes('时间')) return "剑门关全程游玩约4-5小时。";
        return "剑门关是国家5A级景区，以「一夫当关，万夫莫开」闻名。";
    }
    if (lowerQ.includes('翠云廊')) return "翠云廊有7000多棵古柏，徒步约7公里。";
    if (lowerQ.includes('皇泽寺')) return "皇泽寺是中国唯一女皇武则天的祀庙，门票50元。";
    return "您好！我可以帮您解答广元景点、美食、交通等问题。";
}

// 调用DeepSeek API
async function askDeepSeek() {
    const input = document.getElementById('aiQuestionInput');
    const question = input.value.trim();
    if (!question) return;
    
    addAIMessage('user', question);
    input.value = '';
    showTypingIndicator();
    
    try {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: DEEPSEEK_SYSTEM_PROMPT },
                    { role: 'user', content: question }
                ],
                temperature: 0.7,
                max_tokens: 800
            })
        });
        removeTypingIndicator();
        if (!response.ok) throw new Error('API失败');
        const data = await response.json();
        addAIMessage('assistant', data.choices[0].message.content);
        showApiStatus('DeepSeek AI 已连接', true);
    } catch (error) {
        removeTypingIndicator();
        addAIMessage('assistant', getSmartLocalAnswer(question) + '\n\n当前使用本地智能回答。');
        showApiStatus('使用本地模式', false);
    }
}

// 打开AI对话框
function openAIDialog() {
    document.getElementById('aiDialog').classList.add('show');
}