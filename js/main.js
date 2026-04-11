document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const characterListEl = document.getElementById('character-list');
    const activeCharacterEl = document.getElementById('active-character');
    const charNameLabel = document.getElementById('char-name-label');
    const characterImg = document.getElementById('character-img');
    const dialogueBox = document.getElementById('dialogue-box');
    const dialogueText = document.getElementById('dialogue-text');
    const btnNextDialogue = document.getElementById('btn-next-dialogue');
    
    const ingredientsShelfEl = document.getElementById('ingredients-shelf');
    const shakerContentsEl = document.getElementById('shaker-contents');
    const shakerCountEl = document.getElementById('shaker-count');
    const shakerEl = document.getElementById('shaker');
    const dropHint = document.getElementById('drop-hint');
    
    const btnMix = document.getElementById('btn-mix');
    const btnTrash = document.getElementById('btn-trash');

    const messageOverlay = document.getElementById('message-overlay');
    const msgTitle = document.getElementById('msg-title');
    const msgDesc = document.getElementById('msg-desc');
    const btnCloseMsg = document.getElementById('btn-close-msg');

    const bgMusic = document.getElementById('bg-music');
    const volumeSlider = document.getElementById('volume-slider');
    const audioIcon = document.querySelector('.audio-icon');

    const leftDrawer = document.getElementById('left-drawer');
    const drawerHandle = document.getElementById('drawer-handle');

    // Minigame Elements
    const minigameOverlay = document.getElementById('minigame-overlay');
    const minigameShakingView = document.getElementById('minigame-shaking-view');
    const minigameResultView = document.getElementById('minigame-result-view');
    const largeShaker = document.getElementById('large-shaker');
    const dragHint = document.querySelector('.horizontal-drag-hint');
    const progressFill = document.getElementById('progress-fill');
    
    const minigameDrinkName = document.getElementById('minigame-drink-name');
    const minigameDrinkDesc = document.getElementById('minigame-drink-desc');
    const resultDrinkImage = document.getElementById('result-drink-image');
    const btnModalServe = document.getElementById('btn-modal-serve');
    const btnModalTrash = document.getElementById('btn-modal-trash');

    // Collection & Login Elements
    const btnCollection = document.getElementById('btn-collection');
    const collectionModal = document.getElementById('collection-modal');
    const collectionGrid = document.getElementById('collection-grid');
    const btnCloseCollection = document.getElementById('btn-close-collection');
    const btnLogout = document.getElementById('btn-logout');
    const loginPromptOverlay = document.getElementById('login-prompt-overlay');
    const btnSkipLogin = document.getElementById('btn-skip-login');

    // Game State
    let activeCharacter = null;
    let currentOrder = null;
    let currentShaker = [];
    const MAX_INGREDIENTS = 3;
    let mixedDrink = null;
    let isDrawerOpen = false;
    let minigameProgress = 0;
    let isShakingDragging = false;
    let isShowingReaction = false;
    let isFatalReaction = false;

    // Dialogue Memory
    let dialogueHistory = {};

    // Advanced Dialogue State
    let currentDialogueLines = [];
    let currentDialogueIndex = 0;
    let resolvedRequirement = null;
    let currentResultTitle = '';
    let currentResultColor = '';

    // Initialize Game
    init();

    function init() {
        renderCharacters();
        renderIngredients();
        setupEventListeners();
        setupAudio();
        setupDrawer();
        setupDragAndDrop();
        setupShakerMinigame();
        
        // Initialize CloudSync and pass the update callback
        if (window.CloudSync) {
            window.CloudSync.init((newDrinks) => {
                // This runs whenever cloud data changes or login happens
                renderCollection();
            });
        }
    }

    function setupDrawer() {
        let isDragging = false;
        drawerHandle.addEventListener('click', (e) => {
            if (isDragging) return;
            isDrawerOpen = !isDrawerOpen;
            updateDrawerUI();
        });

        let startX;
        let drawerWidth = 360;
        let hasMoved = false;

        drawerHandle.addEventListener('mousedown', (e) => {
            isDragging = false;
            hasMoved = false;
            startX = e.clientX;
            leftDrawer.style.transition = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (startX !== undefined) {
                let moveX = e.clientX - startX;
                if (Math.abs(moveX) > 5) {
                    isDragging = true;
                    hasMoved = true;
                    if (!isDrawerOpen) {
                        let newPos = Math.max(-drawerWidth, Math.min(0, -drawerWidth + moveX));
                        leftDrawer.style.transform = `translateX(${newPos}px)`;
                    } else {
                        let newPos = Math.max(-drawerWidth, Math.min(0, moveX));
                        leftDrawer.style.transform = `translateX(${newPos}px)`;
                    }
                }
            }
        });

        document.addEventListener('mouseup', (e) => {
            if (startX !== undefined) {
                if (hasMoved) {
                    let moveX = e.clientX - startX;
                    if (!isDrawerOpen && moveX > 50) isDrawerOpen = true;
                    else if (isDrawerOpen && moveX < -50) isDrawerOpen = false;
                }
                startX = undefined;
                leftDrawer.style.transition = '';
                leftDrawer.style.transform = '';
                updateDrawerUI();
                setTimeout(() => { isDragging = false; }, 100);
            }
        });
    }

    function updateDrawerUI() {
        if (isDrawerOpen) leftDrawer.classList.remove('closed');
        else leftDrawer.classList.add('closed');
    }

    function setupDragAndDrop() {
        shakerEl.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (currentShaker.length < MAX_INGREDIENTS && !mixedDrink) {
                shakerEl.classList.add('drag-over');
                dropHint.classList.remove('hidden');
            }
        });

        shakerEl.addEventListener('dragleave', (e) => {
            shakerEl.classList.remove('drag-over');
            dropHint.classList.add('hidden');
        });

        shakerEl.addEventListener('drop', (e) => {
            e.preventDefault();
            shakerEl.classList.remove('drag-over');
            dropHint.classList.add('hidden');

            if (!activeCharacter) {
                showPopup("แจ้งเตือน", "กรุณาเลือกผู้ชิมก่อนที่จะเริ่มผสมเครื่องดื่ม", "Red");
                return;
            }

            const ingId = e.dataTransfer.getData('text/plain');
            const ing = ingredientsData.find(i => i.id === ingId);
            if (ing) addIngredient(ing);
        });
    }

    function setupAudio() {
        let previousVolume = volumeSlider.value > 0 ? volumeSlider.value : 0.2;
        let isMuted = false;
        
        // Ensure looping is explicitly enabled
        bgMusic.loop = true;

        audioIcon.addEventListener('click', () => {
            if (!isMuted && bgMusic.volume > 0) {
                previousVolume = bgMusic.volume;
                bgMusic.volume = 0;
                volumeSlider.value = 0;
                audioIcon.textContent = '🔇';
                isMuted = true;
            } else {
                bgMusic.volume = previousVolume;
                volumeSlider.value = previousVolume;
                audioIcon.textContent = previousVolume < 0.5 ? '🔉' : '🔊';
                isMuted = false;
            }
        });

        volumeSlider.addEventListener('input', (e) => {
            let val = parseFloat(e.target.value);
            bgMusic.volume = val;
            if (val === 0) {
                audioIcon.textContent = '🔇';
                isMuted = true;
            } else {
                audioIcon.textContent = val < 0.5 ? '🔉' : '🔊';
                isMuted = false;
                previousVolume = val;
            }
        });

        bgMusic.volume = volumeSlider.value;
        let audioPlayed = false;
        document.addEventListener('click', () => {
            if (!audioPlayed) {
                bgMusic.play().then(() => {
                    audioPlayed = true;
                }).catch((err) => console.log('Autoplay blocked:', err));
            }
        });
    }

    function setupShakerMinigame() {
        let lastX = 0;
        largeShaker.addEventListener('mousedown', (e) => {
            isShakingDragging = true;
            lastX = e.clientX;
            dragHint.style.opacity = '0';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isShakingDragging) return;
            let deltaX = e.clientX - lastX;
            lastX = e.clientX;
            largeShaker.style.transform = `translateX(calc(-50% + ${deltaX * 0.8}px)) rotate(${deltaX * 0.3}deg)`;
            let strength = Math.abs(deltaX);
            if (strength > 0) {
                minigameProgress += strength * 0.15;
                if (minigameProgress >= 100) {
                    minigameProgress = 100;
                    isShakingDragging = false;
                    largeShaker.style.transform = `translateX(-50%) rotate(0deg)`;
                    finishShaking();
                }
                progressFill.style.width = `${minigameProgress}%`;
            }
        });

        document.addEventListener('mouseup', () => {
            if (isShakingDragging) {
                isShakingDragging = false;
                largeShaker.style.transform = `translateX(-50%) rotate(0deg)`;
            }
        });
    }

    function renderCharacters() {
        charactersData.forEach(char => {
            const charCard = document.createElement('div');
            charCard.className = 'char-card';
            charCard.dataset.id = char.id;
            const avatarContent = char.avatarImage 
                ? `<img src="${char.avatarImage}" class="char-avatar-img" alt="${char.name}">`
                : char.avatar;
                
            charCard.innerHTML = `
                <div class="char-card-avatar">${avatarContent}</div>
                <div>${char.name}</div>
            `;
            charCard.addEventListener('click', () => selectCharacter(char));
            characterListEl.appendChild(charCard);
        });
    }

    function renderIngredients() {
        ingredientsData.forEach(ing => {
            const ingEl = document.createElement('div');
            ingEl.className = 'ingredient';
            ingEl.title = ing.name;
            ingEl.draggable = true;
            if (ing.image) {
                ingEl.innerHTML = `
                    <img src="${ing.image}" class="ing-image" alt="${ing.name}" draggable="false">
                    <span>${ing.name}</span>
                `;
                ingEl.classList.add('has-image');
            } else {
                ingEl.innerHTML = `
                    <div class="ing-color-fill" style="background-color: ${ing.color}"></div>
                    <span>${ing.name}</span>
                `;
            }
            ingEl.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', ing.id);
            });
            ingredientsShelfEl.appendChild(ingEl);
        });
    }

    function setupEventListeners() {
        btnMix.addEventListener('click', startMinigame);
        btnTrash.addEventListener('click', trashDrink);
        btnModalServe.addEventListener('click', serveDrink);
        btnModalTrash.addEventListener('click', () => {
            minigameOverlay.classList.add('hidden');
            trashDrink();
        });
        btnCloseMsg.addEventListener('click', closeMessage);
        
        btnNextDialogue.addEventListener('click', () => {
            showNextDialogue();
        });

        dialogueBox.addEventListener('click', (e) => {
            if (e.target === btnNextDialogue) return;
            if (isShowingReaction && currentDialogueIndex === currentDialogueLines.length - 1) {
                closeMessage();
            } else if (!btnNextDialogue.classList.contains('hidden')) {
                showNextDialogue();
            }
        });

        btnCollection.addEventListener('click', toggleCollection);
        btnCloseCollection.addEventListener('click', () => collectionModal.classList.add('hidden'));

        btnSkipLogin.addEventListener('click', () => {
            loginPromptOverlay.classList.add('hidden');
        });

        btnLogout.addEventListener('click', () => {
            if (window.CloudSync) window.CloudSync.logout();
        });
    }

    function selectCharacter(char) {
        if (activeCharacter && activeCharacter.id === char.id) return;
        document.querySelectorAll('.char-card').forEach(el => el.classList.remove('active'));
        const selectedCard = document.querySelector(`.char-card[data-id="${char.id}"]`);
        if (selectedCard) selectedCard.classList.add('active');

        activeCharacter = char;
        activeCharacterEl.classList.remove('hidden');
        characterImg.src = char.images.default;
        charNameLabel.textContent = char.name;

        if (!dialogueHistory[char.id]) {
            dialogueHistory[char.id] = {
                lastOrder: -1,
                lastReaction: { perfect: -1, good: -1, bad: -1 }
            };
        }

        resetBar();
        let charHistory = dialogueHistory[char.id];
        let nextIndex;
        if (char.orders.length > 1) {
            do { nextIndex = Math.floor(Math.random() * char.orders.length); } while (nextIndex === charHistory.lastOrder);
        } else { nextIndex = 0; }
        
        charHistory.lastOrder = nextIndex;
        prepareOrder(char.orders[nextIndex]);
    }

    function prepareOrder(order) {
        currentOrder = order;
        currentDialogueIndex = 0;
        currentDialogueLines = [];
        resolvedRequirement = { ...order.requirement };

        let dialogueTemplate = [...order.dialogue];
        if (order.requirement.type === 'random') {
            const validRecipes = recipesData.filter(r => !r.perfectFor.includes('none'));
            const randomRecipe = validRecipes[Math.floor(Math.random() * validRecipes.length)];
            let tags = [...randomRecipe.perfectFor];
            const neededCount = order.requirement.count || 1;
            let chosenTags = [];
            for (let i = 0; i < neededCount; i++) {
                if (tags.length === 0) break;
                const idx = Math.floor(Math.random() * tags.length);
                chosenTags.push(tags.splice(idx, 1)[0]);
            }
            resolvedRequirement.value = chosenTags;
            let tagIdx = 0;
            dialogueTemplate = dialogueTemplate.map(line => {
                while (line.includes('{สุ่ม}') && tagIdx < chosenTags.length) {
                    const engTag = chosenTags[tagIdx];
                    const thaiTag = tagTranslations[engTag] || engTag;
                    line = line.replace('{สุ่ม}', thaiTag);
                    tagIdx++;
                }
                return line;
            });
        }
        currentDialogueLines = dialogueTemplate;
        updateDialogueUI();
    }

    function updateDialogueUI() {
        dialogueBox.classList.remove('hidden');
        const currentLine = currentDialogueLines[currentDialogueIndex];
        if (isShowingReaction) {
            dialogueBox.classList.add('reaction-active');
            dialogueBox.classList.add('is-floating');
            dialogueBox.style.borderColor = currentResultColor;
            dialogueBox.style.boxShadow = `0 0 20px ${currentResultColor}44`;
            dialogueText.innerHTML = `
                <div style="color: ${currentResultColor}; font-weight: bold; font-size: 1.8rem; margin-bottom: 5px;">${currentResultTitle}</div>
                <div>"${currentLine}"</div>
                ${currentDialogueIndex === currentDialogueLines.length - 1 ? '<div class="continue-hint">(คลิกเพื่อดำเนินการต่อ)</div>' : ''}
            `;
        } else {
            dialogueBox.classList.remove('reaction-active');
            dialogueBox.style.borderColor = '';
            dialogueBox.style.boxShadow = '';
            dialogueText.innerHTML = `"${currentLine}"`;
        }

        if (currentDialogueIndex < currentDialogueLines.length - 1) {
            btnNextDialogue.classList.remove('hidden');
            dialogueBox.classList.add('is-floating');
            btnMix.disabled = true;
            btnTrash.disabled = true;
        } else {
            btnNextDialogue.classList.add('hidden');
            if (!isShowingReaction) {
                dialogueBox.classList.remove('is-floating');
                btnMix.disabled = currentShaker.length === 0;
                btnTrash.disabled = false;
            } else { dialogueBox.classList.add('is-floating'); }
        }
    }

    function showNextDialogue() {
        if (currentDialogueIndex < currentDialogueLines.length - 1) {
            currentDialogueIndex++;
            updateDialogueUI();
        }
    }

    function addIngredient(ing) {
        if (currentShaker.length >= MAX_INGREDIENTS || mixedDrink) return;
        currentShaker.push(ing);
        updateShakerUI();
    }

    function updateShakerUI() {
        shakerCountEl.textContent = `${currentShaker.length}/${MAX_INGREDIENTS}`;
        const isDialogueDone = !isShowingReaction && currentDialogueIndex === currentDialogueLines.length - 1;
        if (currentShaker.length > 0 && isDialogueDone) { btnMix.disabled = false; } else { btnMix.disabled = true; }
        shakerContentsEl.innerHTML = '';
        currentShaker.forEach(ing => {
            const dot = document.createElement('div');
            dot.style.background = ing.color;
            dot.style.width = '10px'; dot.style.height = '10px'; dot.style.borderRadius = '50%';
            dot.style.display = 'inline-block'; dot.style.margin = '2px';
            shakerContentsEl.appendChild(dot);
        });
    }

    function startMinigame() {
        if (currentShaker.length === 0) return;
        btnMix.disabled = true;
        btnTrash.disabled = true;
        minigameOverlay.classList.remove('hidden');
        minigameShakingView.classList.remove('hidden');
        minigameResultView.classList.add('hidden');
        minigameProgress = 0;
        progressFill.style.width = '0%';
        dragHint.style.opacity = '0.5';
    }

    function finishShaking() {
        minigameShakingView.classList.add('hidden');
        determineDrink();
    }

    function determineDrink() {
        const shakerIds = currentShaker.map(ing => ing.id).sort();
        let matchedRecipe = null;
        for (const recipe of recipesData) {
            if (recipe.ingredients.length === 0) continue;
            const recipeIds = [...recipe.ingredients].sort();
            if (JSON.stringify(shakerIds) === JSON.stringify(recipeIds)) { matchedRecipe = recipe; break; }
        }
        if (matchedRecipe) {
            mixedDrink = { ...matchedRecipe };
        } else {
            const nonIce = currentShaker.filter(ing => ing.id !== 'ice');
            const uniqueNonIce = [...new Set(nonIce.map(ing => ing.id))];
            const hasIce = currentShaker.some(ing => ing.id === 'ice');
            if (uniqueNonIce.length === 1) {
                const mainIng = ingredientsData.find(i => i.id === uniqueNonIce[0]);
                const iceSuffix = hasIce ? 'ใสน้ำแข็ง' : '';
                mixedDrink = {
                    name: `${mainIng.name}${iceSuffix}ธรรมดา`,
                    description: 'เครื่องดื่มเรียบง่ายที่เป็นรากฐานของทุกเมนู',
                    color: mainIng.color,
                    perfectFor: ['none'],
                    isPlain: true,
                    image: 'assets/mixedDrink/normalmix.png'
                };
            } else {
                const hasMilk = currentShaker.some(ing => ing.id === 'milk');
                const hasAlcohol = currentShaker.some(ing => ing.type === 'alcohol');
                if (hasMilk) {
                    mixedDrink = { name: 'เครื่องดื่มสีขาวปริศนา', description: 'ดูเหมือนนมทั่วไปแต่กลับมีกลิ่นฉุนประหลาด...', color: '#f5f5dc', perfectFor: ['none'], image: 'assets/mixedDrink/milkmis.png' };
                } else if (hasAlcohol) {
                    mixedDrink = { name: 'เครื่องดื่มกลิ่นสุราฉุน', description: 'กลิ่นเหล้าแรงเตะจมูก...', color: '#b35a00', perfectFor: ['none'], image: 'assets/mixedDrink/alcoholmix.png' };
                } else {
                    mixedDrink = { name: 'น้ำมั่วซั่วสารพัดพิษ', description: 'รสชาติและกลิ่นที่สุดจะบรรยาย...', color: '#333333', perfectFor: ['none'], image: 'assets/mixedDrink/unknowmix.png' };
                }
            }
        }
        showMinigameResult();
    }

    function showMinigameResult() {
        minigameResultView.classList.remove('hidden');
        resultDrinkImage.src = mixedDrink.image || '';
        minigameDrinkName.textContent = mixedDrink.name;
        minigameDrinkDesc.textContent = mixedDrink.description || '';
    }

    function serveDrink() {
        if (!activeCharacter || !mixedDrink || !currentOrder) return;
        let resultType = 'bad';
        const req = resolvedRequirement;
        const drinkTags = mixedDrink.perfectFor;

        if (req.type === 'any') { resultType = drinkTags.includes('none') ? 'bad' : 'perfect'; }
        else if (req.type === 'tag') {
            const allMatch = req.value.every(t => drinkTags.includes(t));
            let ingMatch = true;
            if (currentOrder.requirement.ingredients) {
                ingMatch = currentOrder.requirement.ingredients.some(ingId => currentShaker.some(c => c.id === ingId));
            }
            resultType = (allMatch && ingMatch) ? 'perfect' : (allMatch || ingMatch ? 'good' : 'bad');
        } else if (req.type === 'random') {
            const allMatch = req.value.every(t => drinkTags.includes(t));
            resultType = allMatch ? 'perfect' : (req.value.some(t => drinkTags.includes(t)) ? 'good' : 'bad');
        } else if (req.type === 'ingredient') {
            resultType = currentShaker.some(c => c.id === req.value) ? 'perfect' : 'bad';
        } else if (req.type === 'recipe') {
            resultType = req.value.includes(mixedDrink.name) ? 'perfect' : 'bad';
        }

        if (resultType !== 'bad' && drinkTags.includes('none')) resultType = 'bad';
        if (resultType === 'bad' && !drinkTags.includes('none') && mixedDrink.isPlain) resultType = 'good';

        const reactionOptions = activeCharacter.reactions[resultType] || ["..."];
        let charHistory = dialogueHistory[activeCharacter.id];
        let nextIdx;
        if (reactionOptions.length > 1) {
            do { nextIdx = Math.floor(Math.random() * reactionOptions.length); } while (nextIdx === charHistory.lastReaction[resultType]);
        } else { nextIdx = 0; }
        charHistory.lastReaction[resultType] = nextIdx;
        const selectedReaction = reactionOptions[nextIdx];
        
        if (selectedReaction && typeof selectedReaction === 'object' && selectedReaction.fatal) {
            currentDialogueLines = selectedReaction.lines;
            isFatalReaction = true;
        } else {
            currentDialogueLines = Array.isArray(selectedReaction) ? selectedReaction : [selectedReaction];
            isFatalReaction = false;
        }
        currentDialogueIndex = 0;
        isShowingReaction = true;
        currentResultColor = resultType === 'perfect' ? 'Gold' : (resultType === 'bad' ? 'Red' : 'LightGreen');
        currentResultTitle = resultType === 'perfect' ? 'ยอดเยี่ยม!' : (resultType === 'bad' ? 'แย่มาก!' : 'พอใช้ได้');
        if (activeCharacter.images[resultType]) characterImg.src = activeCharacter.images[resultType];

        // --- SAVE TO CLOUD ---
        if (window.CloudSync) {
            console.log("Serving Drink: Result is", resultType, ". Sending to cloud...");
            window.CloudSync.saveProgress(mixedDrink.name);
        } else {
            console.error("CloudSync component not found!");
        }

        minigameOverlay.classList.add('hidden');
        updateDialogueUI();
    }

    function closeMessage() {
        messageOverlay.classList.add('hidden');
        if (isShowingReaction) {
            if (isFatalReaction) {
                const fatalOverlay = document.getElementById('fatal-overlay');
                const fatalCountdown = document.getElementById('fatal-countdown');
                const fatalAlarm = document.getElementById('fatal-alarm');
                fatalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                bgMusic.pause();
                fatalAlarm.currentTime = 0;
                fatalAlarm.play().catch(err => console.log("Alarm blocked:", err));
                let timeLeft = 10;
                const timer = setInterval(() => {
                    timeLeft--;
                    if (fatalCountdown) fatalCountdown.textContent = timeLeft;
                    if (timeLeft <= 0) { clearInterval(timer); document.body.innerHTML = ''; document.body.style.backgroundColor = 'black'; setTimeout(() => { window.close(); }, 1000); }
                }, 1000);
                return;
            }
            isShowingReaction = false;
            dialogueBox.classList.remove('is-floating');
            resetBar();
            if (activeCharacter) {
                characterImg.src = activeCharacter.images.default;
                let charHistory = dialogueHistory[activeCharacter.id];
                let nextIndex;
                if (activeCharacter.orders.length > 1) {
                    do { nextIndex = Math.floor(Math.random() * activeCharacter.orders.length); } while (nextIndex === charHistory.lastOrder);
                } else { nextIndex = 0; }
                charHistory.lastOrder = nextIndex;
                prepareOrder(activeCharacter.orders[nextIndex]);
            }
        }
    }

    function trashDrink() { resetBar(); }
    function showPopup(title, desc, color = 'Gold') {
        msgTitle.style.color = color; msgTitle.textContent = title;
        msgDesc.textContent = desc; messageOverlay.classList.remove('hidden');
    }
    function resetBar() { currentShaker = []; mixedDrink = null; updateShakerUI(); btnTrash.disabled = false; }

    function toggleCollection() { collectionModal.classList.remove('hidden'); renderCollection(); }

    function renderCollection() {
        if (!collectionGrid || !window.CloudSync) return;
        collectionGrid.innerHTML = '';
        const unlockedDrinks = window.CloudSync.getUnlockedDrinks();
        recipesData.forEach(recipe => {
            const isUnlocked = unlockedDrinks.includes(recipe.name);
            const item = document.createElement('div');
            item.className = `collection-item ${isUnlocked ? '' : 'locked'}`;
            item.innerHTML = `
                <img src="${recipe.image}" class="collection-img" alt="${recipe.name}">
                <span class="collection-name">${isUnlocked ? recipe.name : '???'}</span>
                <div class="collection-info">
                    ${isUnlocked ? `
                        <p style="font-size: 0.75rem; color: #ddd; margin-bottom: 5px;">
                            ${recipe.ingredients.map(ingId => {
                                const ing = ingredientsData.find(i => i.id === ingId);
                                return ing ? ing.name : ingId;
                            }).join(' + ')}
                        </p>
                        <div class="tags">
                            ${recipe.perfectFor.map(t => `<span class="tag-badge">${tagTranslations[t] || t}</span>`).join('')}
                        </div>
                    ` : '<p>ยังไม่เคยทำได้สำเร็จ</p>'}
                </div>
            `;
            collectionGrid.appendChild(item);
        });
    }
});
