const tagTranslations = {
    'sweet': 'หวาน',
    'sour': 'เปรี้ยว',
    'bitter': 'ขม',
    'strong': 'แรง',
    'refreshing': 'สดชื่น',
    'fruity': 'รสผลไม้',
    'milky': 'รสนม',
    'creamy': 'มันๆ',
    'caffeine': 'คาเฟอีน',
    'classic': 'คลาสสิก',
    'fizzy': 'ซ่า',
    'herbal': 'สมุนไพร',
    'tropical': 'เขตร้อน',
    'elegant': 'หรูหรา'
};

const ingredientsData = [
    { id: 'vodka', name: 'Vodka', color: '#e5e5e5', type: 'alcohol', image: 'assets/material/vodka.png' },
    { id: 'whiskey', name: 'Whiskey', color: '#c67000', type: 'alcohol', image: 'assets/material/whiskey.png' },
    { id: 'gin', name: 'Gin', color: '#e0f7fa', type: 'alcohol', image: 'assets/material/gin.png' },
    { id: 'rum', name: 'Rum', color: '#8b4513', type: 'alcohol', image: 'assets/material/rum.png' },
    { id: 'tequila', name: 'Tequila', color: '#f5d179', type: 'alcohol', image: 'assets/material/taquila.png' },

    { id: 'orange', name: 'Orange', color: '#ffa500', type: 'mixer', image: 'assets/material/orange.png' },
    { id: 'lemon', name: 'Lemon', color: '#ffff00', type: 'mixer', image: 'assets/material/lemon.png' },
    { id: 'cola', name: 'Cola', color: '#3b2f2f', type: 'mixer', image: 'assets/material/cola.png' },
    { id: 'soda', name: 'Soda', color: '#cceeff', type: 'mixer', image: 'assets/material/soda.png' },

    { id: 'milk', name: 'Milk', color: '#f5f5dc', type: 'mixer', image: 'assets/material/milk.png' },
    { id: 'coffee', name: 'Coffee', color: '#3d2314', type: 'mixer', image: 'assets/material/coffee.png' },
    { id: 'tea', name: 'Tea', color: '#c46210', type: 'mixer', image: 'assets/material/tea.png' },
    { id: 'matcha', name: 'Matcha', color: '#8b9c64', type: 'mixer', image: 'assets/material/matcha.png' },

    { id: 'syrup', name: 'Syrup', color: '#ffeccd', type: 'mixer', image: 'assets/material/syrup.png' },
    { id: 'mint', name: 'Mint', color: '#3deb34', type: 'mixer', image: 'assets/material/mint.png' },
    { id: 'ice', name: 'Ice', color: '#add8e6', type: 'extra', image: 'assets/material/ice.png' }
];

const recipesData = [
    // --- CLASSIC COCKTAILS ---
    { name: 'Screwdriver', ingredients: ['vodka', 'orange', 'ice'], color: '#ffb347', perfectFor: ['fruity', 'classic', 'refreshing'], image: 'assets/result/Classic Cocktails/screwdriver.png', description: 'การพบกันที่เรียบง่ายแต่ทรงพลังของวอดก้าและน้ำส้ม คลาสสิกตลอดกาล' },
    { name: 'Whiskey Cola', ingredients: ['whiskey', 'cola', 'ice'], color: '#49311c', perfectFor: ['strong', 'fizzy', 'classic'], image: 'assets/result/Classic Cocktails/whisky cola.png', description: 'ความเข้มข้นของวิสกี้เคล้าความซ่าของโคล่า รสชาติที่คุ้นเคยในยามค่ำคืน' },
    { name: 'Gin Lime', ingredients: ['gin', 'lemon', 'syrup'], color: '#f0ffc2', perfectFor: ['sour', 'elegant', 'classic'], image: 'assets/result/Classic Cocktails/gin lime.png', description: 'รสเปรี้ยวจี๊ดตัดกับความซับซ้อนของจิน ให้ความรู้สึกหรูหราและสดชื่น' },
    { name: 'White Russian', ingredients: ['vodka', 'milk', 'coffee'], color: '#faebd7', perfectFor: ['milky', 'strong', 'creamy'], image: 'assets/result/Classic Cocktails/white russian.png', description: 'นุ่มละมุนดุจแพรไหม ด้วยส่วนผสมของนมและเหล้ากาแฟที่เข้ากันอย่างน่าเหลือเชื่อ' },
    { name: 'Margarita', ingredients: ['tequila', 'lemon', 'syrup'], color: '#e6fac3', perfectFor: ['sour', 'strong', 'tropical'], image: 'assets/result/Classic Cocktails/margarita.png', description: 'รสเปรี้ยวเค็มที่ลงตัว พาคุณจินตนาการถึงชายหาดในเม็กซิโก' },
    { name: 'Rum Mojito-style', ingredients: ['rum', 'mint', 'soda'], color: '#baffc9', perfectFor: ['refreshing', 'herbal', 'fizzy'], image: 'assets/result/Classic Cocktails/Rum Mojito-style.png', description: 'ความหอมสดชื่นของมินต์ผสมผสานกับเหล้ารัม ให้ความเย็นฉ่ำในทุกอึก' },
    { name: 'Cuba Libre', ingredients: ['rum', 'cola', 'ice'], color: '#523425', perfectFor: ['strong', 'fizzy', 'tropical'], image: 'assets/result/Classic Cocktails/Cuba Libre.png', description: 'อิสรภาพในแก้วน้ำ ด้วยรสสัมผัสที่เป็นเอกลักษณ์ของรัมและโคล่า' },
    { name: 'Tequila Sunrise', ingredients: ['tequila', 'orange', 'syrup'], color: '#ff884d', perfectFor: ['fruity', 'strong', 'tropical'], image: 'assets/result/Classic Cocktails/Tequila Sunrise.png', description: 'สีสันของรุ่งอรุณที่มาพร้อมความแรงของเตกีล่าและน้ำส้ม' },
    { name: 'Gin Fizz', ingredients: ['gin', 'lemon', 'soda'], color: '#e1f5fe', perfectFor: ['sour', 'fizzy', 'classic'], image: 'assets/result/Classic Cocktails/Gin Fizz.png', description: 'ความซ่าที่พริ้วไหวผสมกับความเปรี้ยวของเลมอน สดชื่นจนหยุดไม่อยู่' },
    { name: 'Black Russian', ingredients: ['vodka', 'coffee', 'ice'], color: '#2a1a10', perfectFor: ['strong', 'bitter', 'caffeine'], image: 'assets/result/Classic Cocktails/Black Russian.png', description: 'เข้มข้นและดุดัน สำหรับผู้ที่ต้องการรสชาติกาแฟผสมเหล้าแบบถึงใจ' },
    { name: 'Vodka Soda', ingredients: ['vodka', 'soda', 'ice'], color: '#dcfafa', perfectFor: ['fizzy', 'strong', 'refreshing'], image: 'assets/result/Classic Cocktails/Vodka Soda.png', description: 'บริสุทธิ์และซ่าถึงใจ สไตล์มินิมอลสำหรับคนที่รักความเรียบง่าย' },
    { name: 'Whiskey Sour', ingredients: ['whiskey', 'lemon', 'syrup'], color: '#e6cc80', perfectFor: ['sour', 'strong', 'classic'], image: 'assets/result/Classic Cocktails/Whiskey Sour.png', description: 'ศิลปะแห่งความเปรี้ยวอมหวานที่มาพร้อมความนุ่มนวลของวิสกี้' },
    { name: 'Vodka Lemon Sour', ingredients: ['vodka', 'lemon', 'syrup'], color: '#fffacd', perfectFor: ['sour', 'strong', 'refreshing'], image: 'assets/result/Classic Cocktails/Vodka Lemon Sour.png', description: 'ความเปรี้ยวที่ปะทะกับวอดก้าอย่างลงตัว ดับกระหายได้เป็นอย่างดี' },
    { name: 'Moscow Mule-style', ingredients: ['vodka', 'mint', 'soda'], color: '#dff0e6', perfectFor: ['refreshing', 'herbal', 'fizzy'], image: 'assets/result/Classic Cocktails/Moscow Mule-style.png', description: 'ความหอมของมินต์และโซดาที่ทำให้วอดก้าดื่มง่ายเหมือนดื่มน้ำเปล่า' },
    { name: 'Rum Orange', ingredients: ['rum', 'orange', 'ice'], color: '#d98b4c', perfectFor: ['fruity', 'strong', 'tropical'], image: 'assets/result/Classic Cocktails/Rum Orange.png', description: 'กลิ่นอายเขตร้อนด้วยความหวานของน้ำส้มและรัมชั้นดี' },
    { name: 'Coffee Rum', ingredients: ['rum', 'coffee', 'ice'], color: '#3d2616', perfectFor: ['caffeine', 'strong', 'bitter'], image: 'assets/result/Classic Cocktails/Coffee Rum.png', description: 'ปลุกพลังด้วยคาเฟอีนและรัม รสชาติขมอมหวานที่ลุ่มลึก' },
    { name: 'Tequila Soda', ingredients: ['tequila', 'soda', 'ice'], color: '#f0f5ee', perfectFor: ['fizzy', 'strong', 'tropical'], image: 'assets/result/Classic Cocktails/Tequila Soda.png', description: 'สะอาด สดชื่น และให้พลังงานด้วยเตกีล่าและโซดา' },
    { name: 'Gin Mint Fizz', ingredients: ['gin', 'mint', 'soda'], color: '#e0ffe6', perfectFor: ['herbal', 'fizzy', 'elegant'], image: 'assets/result/Classic Cocktails/Gin Mint Fizz.png', description: 'ความหอมสมุนไพรของมินต์ที่ช่วยชูรสจินให้โดดเด่นสะดุดตา' },
    { name: 'Whiskey Mint', ingredients: ['whiskey', 'mint', 'ice'], color: '#b5a153', perfectFor: ['strong', 'herbal', 'classic'], image: 'assets/result/Classic Cocktails/Whiskey Mint.png', description: 'ความเข้มที่มาพร้อมความหอมเย็นสดชื่น สไตล์สุภาพบุรุษ' },
    { name: 'Rum Syrup Soda', ingredients: ['rum', 'syrup', 'soda'], color: '#ffe4c4', perfectFor: ['sweet', 'fizzy', 'tropical'], image: 'assets/result/Classic Cocktails/Rum Syrup Soda.png', description: 'ความหวานฉ่ฉ่ำที่ซ่อนความแรงของรัมไว้อย่างแนบเนียน' },

    // --- CAFE & TEA ---
    { name: 'Iced Latte', ingredients: ['coffee', 'milk', 'ice'], color: '#a67b5b', perfectFor: ['caffeine', 'milky', 'creamy'], image: 'assets/result/Cafe & Tea/Iced Latte.png', description: 'ความนุ่มของนมที่ผสมผสานกับกาแฟเข้มข้นอย่างพอดี' },
    { name: 'Matcha Latte', ingredients: ['matcha', 'milk', 'ice'], color: '#aec670', perfectFor: ['caffeine', 'herbal', 'milky'], image: 'assets/result/Cafe & Tea/Matcha Latte.png', description: 'รสชาติต้นตำรับจากญี่ปุ่น หอมกลิ่นมัทฉะและนมนุ่มละมุน' },
    { name: 'Lemon Iced Tea', ingredients: ['tea', 'lemon', 'ice'], color: '#d27d2d', perfectFor: ['caffeine', 'sour', 'refreshing'], image: 'assets/result/Cafe & Tea/Lemon Iced Tea.png', description: 'ชามะนาวรสเปรี้ยวอมหวาน ดับร้อนได้ดีที่สุดในวันอบอ้าว' },
    { name: 'Thai Milk Tea', ingredients: ['tea', 'milk', 'ice'], color: '#d2b48c', perfectFor: ['sweet', 'milky', 'creamy'], image: 'assets/result/Cafe & Tea/Thai Milk Tea.png', description: 'ชาไทยสีส้มเป็นเอกลักษณ์ หอมหวานมัน สไตล์สตรีทฟู้ดยอดฮิต' },
    { name: 'Mint Tea', ingredients: ['tea', 'mint', 'ice'], color: '#a08b3e', perfectFor: ['caffeine', 'herbal', 'refreshing'], image: 'assets/result/Cafe & Tea/Mint Tea.png', description: 'ชาหอมเย็นสดชื่น ช่วยให้ผ่อนคลายและตื่นตัวในเวลาเดียวกัน' },
    { name: 'Coffee Lemon Soda', ingredients: ['coffee', 'lemon', 'soda'], color: '#59441a', perfectFor: ['caffeine', 'sour', 'fizzy'], image: 'assets/result/Cafe & Tea/Coffee Lemon Soda.png', description: 'ความแปลกใหม่ที่ลงตัว กาแฟส้มโซดาที่ทำให้คุณสดชื่นถึงใจ' },
    { name: 'Matcha Soda', ingredients: ['matcha', 'soda', 'ice'], color: '#889e47', perfectFor: ['herbal', 'fizzy', 'refreshing'], image: 'assets/result/Cafe & Tea/Matcha Soda.png', description: 'ความซ่าที่มาพร้อมกลิ่นอายชาเขียว สดชื่นไม่เหมือนใคร' },
    { name: 'Matcha Mint', ingredients: ['matcha', 'mint', 'ice'], color: '#7da16d', perfectFor: ['herbal', 'refreshing', 'bitter'], image: 'assets/result/Cafe & Tea/Matcha Mint.png', description: 'มัทฉะเข้มข้นผสมมินต์เย็นฉ่ำ รสชาติลุ่มลึกที่ชวนหลงใหล' },
    { name: 'Orange Tea', ingredients: ['tea', 'orange', 'ice'], color: '#b8601c', perfectFor: ['caffeine', 'fruity', 'refreshing'], image: 'assets/result/Cafe & Tea/Orange Tea.png', description: 'ชาผลไม้ที่รวมความหอมของใบชาและน้ำส้มเข้าไว้ด้วยกัน' },
    { name: 'Lemon Mint Tea', ingredients: ['tea', 'lemon', 'mint'], color: '#bfae3d', perfectFor: ['sour', 'herbal', 'refreshing'], image: 'assets/result/Cafe & Tea/Lemon Mint Tea.png', description: 'ความเปรี้ยวเย็นสดชื่นที่ลงตัวที่สุดสำหรับสายรักสุขภาพ' },
    { name: 'Coffee Mint', ingredients: ['coffee', 'mint', 'ice'], color: '#4d3b26', perfectFor: ['caffeine', 'herbal', 'bitter'], image: 'assets/result/Cafe & Tea/Coffee Mint.png', description: 'กาแฟรสเข้มที่แฝงความเย็นเยือกของมินต์ ปลุกคุณให้ตื่นจากการหลับใหล' },

    // --- MOCKTAILS & REFRESHERS ---
    { name: 'Lemon Soda', ingredients: ['lemon', 'soda', 'syrup'], color: '#ffffcc', perfectFor: ['sour', 'fizzy', 'refreshing'], image: 'assets/result/Mocktails & Refreshers/Lemon Soda.png', description: 'เปรี้ยวซ่าสะใจ ดับร้อนได้ทันทีที่ดื่ม' },
    { name: 'Orange Soda', ingredients: ['orange', 'soda', 'ice'], color: '#ffc87c', perfectFor: ['fruity', 'fizzy', 'sweet'], image: 'assets/result/Mocktails & Refreshers/Orange Soda.png', description: 'รสส้มหวานซ่า สดใสเหมือนวันหยุดสุดสัปดาห์' },
    { name: 'Virgin Mojito', ingredients: ['mint', 'lemon', 'soda'], color: '#caffd4', perfectFor: ['herbal', 'sour', 'fizzy'], image: 'assets/result/Mocktails & Refreshers/Virgin Mojito.png', description: 'โมจิโต้ไร้แอลกอฮอล์ที่ยังคงความหอมสดชื่นจากมินต์และมะนาวครบถ้วน' },
    { name: 'Orange Lemon Fizz', ingredients: ['orange', 'lemon', 'soda'], color: '#ffdf80', perfectFor: ['fruity', 'sour', 'fizzy'], image: 'assets/result/Mocktails & Refreshers/Orange Lemon Fizz.png', description: 'การผสมผสานของสองผลไม้ตระกูลส้มที่ซ่าถึงใจ' },
    { name: 'Mint Syrup Soda', ingredients: ['mint', 'syrup', 'soda'], color: '#e0fff0', perfectFor: ['sweet', 'herbal', 'fizzy'], image: 'assets/result/Mocktails & Refreshers/Mint Syrup Soda.png', description: 'ความหอมหวานสีเขียวสดใส ที่มาพร้อมความซ่าสดชื่น' },
    { name: 'Orange Mint Soda', ingredients: ['orange', 'mint', 'soda'], color: '#ffb366', perfectFor: ['fruity', 'herbal', 'fizzy'], image: 'assets/result/Mocktails & Refreshers/Orange Mint Soda.png', description: 'ความหวานของส้มตัดกับความเย็นของมินต์ รสชาติที่คาดไม่ถึง' },
    { name: 'Cola', ingredients: ['cola', 'ice'], color: '#1a0d08', perfectFor: ['sweet', 'fizzy', 'classic'], image: 'assets/result/Mocktails & Refreshers/Cola.png', description: 'รสชาติคลาสสิกที่ทุกคนหลงรัก เย็นฉ่ำถึงปอด' }
];

const charactersData = [
    {
        id: 'marayu',
        name: 'Marayu',
        avatar: '🦊',
        avatarImage: 'assets/character/marayu/avatar.png',
        images: {
            default: 'assets/character/marayu/Default.png',
            perfect: 'assets/character/marayu/Perfect.png',
            good: 'assets/character/marayu/Good.png',
            bad: 'assets/character/marayu/Bad.png',
            bored: 'assets/character/marayu/Bored.png'
        },
        orders: [
            {
                dialogue: ["หึ!! ฉันก็ไม่ได้คาดหวังอะไรจากคนอย่างคุณหรอกนะคะ", "ขออะไรที่มันหวานหอมก็แล้วกันค่ะ"],
                requirement: { type: 'tag', value: ['sweet'] }
            },
            {
                dialogue: ["เอาสิ อะไรก็ได้ที่คิดว่าคนอย่างคุณจะทำเป็น", "แต่ก็ขอที่มันคลาสสิคและหรูหราหน่อย"],
                requirement: { type: 'tag', value: ['classic', 'elegant'] }
            },
            {
                dialogue: ["มองอะไรคะ!?", "เอาเครื่องดื่มมาสิคะ จ้องอยู่ได้", "เอาแบบที่หอมๆน่ะค่ะ แล้วก็เป็นชาซิคะ"],
                requirement: { type: 'tag', value: ['herbal'], ingredients: ['tea', 'matcha'] }
            },
            {
                dialogue: ["ก็ไม่ได้เก่งอะไรหรอกค่ะ อย่าประเมินตัวเองมากไป", "ฉันขอเครื่องดื่มที่มัน{สุ่ม}{สุ่ม}{สุ่ม}"],
                requirement: { type: 'random', count: 3 }
            },
            {
                dialogue: ["อากาศร้อนจนน่าหงุดหงิดจริงๆ", "ฉันอยากได้อะไรซ่าๆ ที่มีรส{สุ่ม}หน่อย"],
                requirement: { type: 'random', count: 1, baseTags: ['fizzy'] }
            },
            {
                dialogue: ["มองหน้าฉันแบบนี้ มีปัญหาอะไรหรือเปล่าคะ?", "ชงเครื่องดื่มที่มีรส{สุ่ม} กับ {สุ่ม} มาให้ฉันสิ"],
                requirement: { type: 'random', count: 2 }
            }
        ],
        reactions: {
            perfect: [
                ["หะ...หือ!? ก็...ก็พอดื่มได้นี่คะ", "ไม่ได้ชมนะ!", "แค่พอดื่มได้!"],
                ["อร่อย... อ๊ะ!? ไม่ใช่สิ!", "ก็แค่รสชาติมาตรฐานทั่วไปนั่นแหละค่ะ!"],
                ["หึ... ฝีมือระดับนี้ก็พอเข้าตาฉันอยู่บ้างค่ะ", "ทำดีต่อไปนะคะ อย่าทำให้ฉันผิดหวังล่ะ"]
            ],
            good: [
                "อืม... ก็ไม่เลวร้ายเท่าไหร่ แต่คราวหน้าต้องดีกว่านี้นะ",
                ["ก็นะ... ไม่ได้แย่ค่ะ", "แต่คุณน่ะทำได้ดีกว่านี้ไม่ใช่เหรอคะ?"],
                "ใช้ได้ค่ะ... สำหรับคนอย่างคุณน่ะนะ"
            ],
            bad: [
                { lines: ["*แค่กๆ*", "นี่มันอะไรกันคะ!!", "แย่ที่สุด...ตายซะ"], fatal: true },
                "นี่มันอะไรกันคะ!? รสชาติทุเรศที่สุด! คิดจะแกล้งฉันหรือไง!?",
                ["อึก... รสชาติแบบนี้...", "คุณจงใจจะล้างแค้นฉันด้วยเครื่องดื่มนี้เหรอคะ!?"],
                "ทิ้งไปเดี๋ยวนี้เลยนะ! อย่าเอามาให้ฉันเห็นอีก!"
            ]
        }
    },
    {
        id: 'mayuri',
        name: 'Mayuri',
        avatar: '🐱',
        avatarImage: 'assets/character/mayuri/avatar.png',
        images: {
            default: 'assets/character/mayuri/Default.png',
            perfect: 'assets/character/mayuri/Perfect.png',
            good: 'assets/character/mayuri/Good.png',
            bad: 'assets/character/mayuri/Bad.png',
            bored: 'assets/character/mayuri/Bored.png'
        },
        orders: [
            {
                dialogue: ["สวัสดียามเย็นค่ะ", "คุณชงชาหอมๆให้หน่อยจะได้ไหมคะ", "ที่มันเปรี้ยวและสดชื่นน่ะค่ะ"],
                requirement: { type: 'tag', value: ['sour', 'refreshing'], ingredients: ['tea', 'matcha'] }
            },
            {
                dialogue: ["เอ่อ..ก็ไม่อยากรบกวนคุณเท่าไหร่หรอกนะคะ", "คุณคิดว่าตัวเองชงอะไรได้บ้างคะ", "เอาเป็นอะไรก็ได้แล้วกันค่ะ"],
                requirement: { type: 'any' }
            },
            {
                dialogue: ["ขอลองชมฝีมือหน่อยนะคะ", "คิดว่าจะชงอะไรให้ฉันหรอคะ?", "แต่ถ้าเลือกได้ก็อยาก{สุ่ม}{สุ่ม}{สุ่ม}"],
                requirement: { type: 'random', count: 3 }
            },
            {
                dialogue: ["ยิ้มเข้าไว้นะคะ! โลกจะได้สดใส", "ช่วยทำอะไรที่มันมีความเป็น {สุ่ม} ให้ฉันทีค่ะ"],
                requirement: { type: 'random', count: 1 }
            },
            {
                dialogue: ["ร้านนี้บรรยากาศอบอุ่นจังเลยนะคะ", "ขอรสชาติแนว {สุ่ม} และ {สุ่ม} จะได้ไหมคะ?"],
                requirement: { type: 'random', count: 2 }
            }
        ],
        reactions: {
            perfect: [
                ["ว้าว! วิเศษที่สุดเลยค่ะ!", "รสชาตินี้แหละที่ทำให้ใจพองโตเลย!"],
                ["อื้มมม~ รสชาติเหมือนอยู่ในสวรรค์เลยค่ะ", "คุณนี่เก่งที่สุดเลยนะคะ!"],
                ["ที่สุดเลยค่ะ!", "แก้วนี้มายูริให้คะแนนเต็มร้อยเลยยย!"]
            ],
            good: [
                "อร่อยดีค่ะ ขอบคุณนะคะที่ตั้งใจชงให้",
                ["รสชาติกำลังดีเลยค่ะ", "ถ้าเปรี้ยวกว่านี้อีกนิดระดับเทพเลยนะคะเนี่ย"],
                "แฮปปี้นิดๆ ค่ะ ขอบคุณที่ตั้งใจทำนะคะ"
            ],
            bad: [
                ["เอ๊ะ... รสชาติแปลกๆ นะคะเนี่ย", "แต่อาจจะเป็นความผิดของฉันเองที่สั่งไม่ดี..."],
                ["อูย... รสชาติแอบประหลาดจังเลยค่ะ", "ไม่เป็นไรนะ มายูริว่าคราวหน้าต้องดีกว่านี้แน่ๆ"],
                "ฮือ... รสชาติมันเศร้าจังเลยค่ะ"
            ]
        }
    },
    {
        id: 'cooktail',
        name: 'Cooktail',
        avatar: '🍸',
        avatarImage: 'assets/character/cooktail/avatar.png',
        images: {
            default: 'assets/character/cooktail/Default.png',
            perfect: 'assets/character/cooktail/Perfect.png',
            good: 'assets/character/cooktail/Good.png',
            bad: 'assets/character/cooktail/Bad.png',
            bored: 'assets/character/cooktail/Bored.png'
        },
        orders: [
            {
                dialogue: ["สายัณห์สวัสดิ์", "ไม่ได้พบกันนานเลย ชอบชงเครื่องดื่มงั้นหรอ?", "เห้อ... อากาศร้อนๆวันนี้ขอเครื่องดื่มที่แรงๆหน่อยก็แล้วกัน"],
                requirement: { type: 'tag', value: ['strong'] }
            },
            {
                dialogue: ["สายัณห์สวัสดิ์", "พอมีฝีมือเหมือนกันนะคะเนี่ย", "ขอเป็นRumก็แล้วกันนะ"],
                requirement: { type: 'ingredient', value: 'rum' }
            },
            {
                dialogue: ["กาลเวลาเปลี่ยนไป แต่รสชาติที่ดียังคงเดิมเสมอ", "ทำเครื่องดื่มรส {สุ่ม} ให้ข้าลองดูสักหน่อยสิ"],
                requirement: { type: 'random', count: 1 }
            },
            {
                dialogue: ["ความสงบนิ่งคือหัวใจของการชง...", "ลองผสานรส {สุ่ม} และ {สุ่ม} เข้าด้วยกันดูสิ"],
                requirement: { type: 'random', count: 2 }
            }
        ],
        reactions: {
            perfect: [
                ["ยอดเยี่ยม...", "รสชาติที่ลึกซึ้งแบบนี้ ไม่ได้สัมผัสมานานเท่าไหร่แล้วนะ..."],
                ["สมบูรณ์แบบมากจ้ะ", "คนหนุ่มสมัยนี้เก่งกาจไม่เบาเลยนะ"],
                ["ที่สุดของคืนนี้เลย...", "ขอบใจมากนะจ๊ะ สำหรับรสชาติที่หาตัวจับยากแบบนี้"]
            ],
            good: [
                "อืม... เข้าใจเลือกส่วนผสมนะ พอจะรับรู้ถึงความตั้งใจอยู่บ้าง",
                ["จัดวางองค์ประกอบได้ดีจ้ะ", "แต่ถ้าเพิ่มความหอมอีกนิดจะไร้ที่ติเลย"],
                "รสชาติของผู้ใหญ่ที่เข้าใจโลก"
            ],
            bad: [
                ["เจ้านี่... ยังต้องฝึกฝนอีกมาก", "รสชาติยังขาดความเคารพในวัตถุดิบนะ"],
                "รสชาติมันสะเปะสะปะเกินไป... ดิฉันผิดหวังเล็กน้อยจ้ะ",
                ["*แค่กๆ*", "สงสัยวันนี้คุณจะพักผ่อนน้อยไปนะ รสชาติถึงได้ออกมาเป็นแบบนี้"]
            ]
        }
    },
    {
        id: 'maria',
        name: 'Maria',
        avatar: '🐰',
        avatarImage: 'assets/character/maria/avatar.png',
        images: {
            default: 'assets/character/maria/Default.png',
            perfect: 'assets/character/maria/Perfect.png',
            good: 'assets/character/maria/Good.png',
            bad: 'assets/character/maria/Bad.png',
            bored: 'assets/character/maria/Bored.png'
        },
        orders: [
            {
                dialogue: ["ตายจริง ตอบมารับหน้าที่ชงเครื่องดื่มแบบนี้", "มารายูได้สอนคุณหรือเปล่า?", "หรือชงเป็นอยู่แล้ว", "แย่จริงๆ ไม่เป็นไรฉันขออะไรง่ายๆแล้วกันอย่างลาเต้น่ะ"],
                requirement: { type: 'recipe', value: ['Iced Latte', 'Matcha Latte'] }
            },
            {
                dialogue: ["ทำงานวันแรกก็เหนื่อยเลย", "ถ้าให้ช่วยสอนก็บอกกันได้นะไม่ต้องกลัว", "เอาเป็นเครื่องดื่มโซดาแล้วกัน", "อยากได้อะไรที่มันซ่าๆ"],
                requirement: { type: 'ingredient', value: 'soda' }
            },
            {
                dialogue: ["ดูเหนื่อยๆนะจ๊ะ พักบ้างก็ได้", "ขอเครื่องดื่มที่ดื่มแล้วรู้สึก {สุ่ม} หน่อยสิ"],
                requirement: { type: 'random', count: 1 }
            },
            {
                dialogue: ["เด็กสมัยนี้เก่งกันจังเลยนะ", "ช่วยทำอะไรที่รสชาติ {สุ่ม} และมีกลิ่น {สุ่ม} ให้หน่อย"],
                requirement: { type: 'random', count: 2 }
            }
        ],
        reactions: {
            perfect: [
                ["อุ๊ย! อร่อยจังเลยจ๊ะ เก่งกว่าที่คิดไว้อีกนะเนี่ย", "ภูมิใจในตัวเองด้วยนะ!"],
                ["รสชาตินี้ยอดเยี่ยมมากเลยจ้ะ", "พร้อมจะไปเปิดบาร์ของตัวเองแล้วนะนี่"],
                ["ที่สุดของความอร่อยเลยจ้ะ!", "ขอบใจนะที่ตั้งใจทำให้"]
            ],
            good: [
                "ใช้ได้เลยจ๊ะ รสนุ่มนวลดีนะ ขอบใจมากนะ",
                ["ทำได้ไม่เลวเลยนะจ๊ะ", "อีกนิดเดียวบทเรียนนี้ก็จะสอบผ่านแล้วนะ"],
                "อื้มมม~ รสชาติดีจ้ะชอบ"
            ],
            bad: [
                ["โอ้... รสชาติเข้มข้นไปนิดนะจ๊ะ คราวหน้าค่อยๆ ใส่ส่วนผสมนะ", "ฉันเชื่อว่าทำได้ดีกว่านี้จ้ะ"],
                ["อึก... รสชาติแอบแปลกไปหน่อยนะจ๊ะ", "แต่ว่าแค่ลืมสูตรนิดหน่อยใช่ไหมล่ะ?"],
                "*แค่กๆ* ...ไม่เป็นไรนะ พลาดแก้วนี้เดี๋ยวเราลองใหม่แก้วหน้ากันนะ"
            ]
        }
    },
    {
        id: 'meryn',
        name: 'Meryn',
        avatar: '🧚',
        avatarImage: 'assets/character/meryn/avatar.png',
        images: {
            default: 'assets/character/meryn/Default.png',
            perfect: 'assets/character/meryn/Perfect.png',
            good: 'assets/character/meryn/Good.png',
            bad: 'assets/character/meryn/Bad.png',
            bored: 'assets/character/meryn/Bored.png'
        },
        orders: [
            {
                dialogue: ["ฉันเอาอะไรก็ได้ค่ะ...."],
                requirement: { type: 'any' }
            },
            {
                dialogue: ["ฉันขอที่มัน....{สุ่ม}"],
                requirement: { type: 'random', count: 1 }
            },
            {
                dialogue: ["เครื่องดื่ม...{สุ่ม}...และ", "...{สุ่ม}ค่ะ"],
                requirement: { type: 'random', count: 2 }
            }
        ],
        reactions: {
            perfect: [
                ["ก็อร่อย...ดีนะคะ เก่งจัง", "ฉันชอบค่ะ"],
                ["...อร่อย...", "...ขอบคุณค่ะ..."],
                ["รสชาตินี้...รู้สึกดีจัง"],
                ["ดีที่สุด...เท่าที่เคยดื่มมาเลยค่ะ"]
            ],
            good: [
                "ก็พอใช้ได้นะคะ...",
                ["...ไม่เลวค่ะ...", "...กินได้เรื่อยๆ..."],
                "ขอบคุณนะคะ... รสชาติกลมกล่อมดี"
            ],
            bad: [
                "รสชาติมัน...แย่จังค่ะ...",
                ["*แค่กๆ*", "...ขมขื่นจัง...", "...รสชาติเหมือนโลกกำลังจะแตก..."],
                "*แค่กๆ*...ทิ้งไปเถอะค่ะ...", "ฉันกินต่อไม่ได้..."
            ]
        }
    }
];
