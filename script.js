document.addEventListener("DOMContentLoaded", function() {
    // Tanay, Rizal center and bounds
    var tanayCenter = [14.498230, 121.285389]; // Approximate center of the defined area
    var minZoomLevel = window.innerWidth <= 768 ? 16 : 17; // Set lower minZoom for mobile devices

    var map = L.map('map', {
        center: tanayCenter,
        zoom: 18,            // Initial zoom level for a closer view of the area
        maxZoom: 18,         // Max zoom to keep focus on Tanay
        minZoom: minZoomLevel, // Adjust minZoom based on device
        maxBounds: [         // Restrict the view to these bounds
            [14.487523, 121.274111],  // Southwest corner of the defined area
            [14.513158, 121.296611]   // Northeast corner of the defined area
        ],
        maxBoundsViscosity: 1.0,  // Makes the boundaries hard to cross
        bounceAtZoomLimits: false // Prevents snapping back when hitting the boundary
    });

    L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=xZL9GQgnbzaUJBDNErxW', {
        attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>',
    }).addTo(map);

    // Sidebar toggle logic
    const toggleButton = document.getElementById("toggleSidebar");
    const sidebar = document.getElementById("sidebar");

    // Initially hide the sidebar
    sidebar.classList.remove("visible");

    toggleButton.addEventListener("click", function () {
        if (window.innerWidth <= 600) {
            sidebar.classList.toggle("visible");
            logoCircle.classList.toggle("scaled"); // Always toggle 'scaled' on logo click
        }
    });

    const logoCircle = document.getElementById("toggleSidebar");

    if (!logoCircle) {
        console.error("Logo element not found!"); // Log an error if the logo is not found
    }

    // Function to close the sidebar
    function closeSidebar() {
        sidebar.classList.remove("visible");
        if (logoCircle.classList.contains("scaled")) {
            logoCircle.classList.remove("scaled");
        }
    }

    // Close the sidebar when clicking anywhere outside of it
    document.addEventListener("click", function (event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnLogo = toggleButton.contains(event.target);

        // Close the sidebar and toggle the scaled class only if the sidebar is visible
        if (!isClickInsideSidebar && !isClickOnLogo && sidebar.classList.contains("visible")) {
            closeSidebar();
        }
    });



    // POI Categories // Add new locations here
    const categories = {
        restaurants: [
            { name: "Kainan Sa Tabing Lawa Restaurant", coords: [14.496368382643709, 121.27803192847686] },
            { name: "Tanayan Restaurant", coords: [14.502766847121284, 121.286228759249] },
            { name: "Rambulls Bakahan sa Tanay", coords: [14.502933038536995, 121.29223690712573] },
            { name: "Julia Bandoma Vista Restaurant", coords: [14.50156195562837, 121.29498348901224] },
            { name: "Izeia Food-S", coords: [14.4992144522678, 121.28714950391344] },
            { name: "Mang Avet's Restaurant", coords: [14.50406443623828, 121.29742104811633] },
            { name: "Kimchee Delight - Tanay", coords: [14.509641614545343, 121.28227067565052] },
            { name: "The Kitchen", coords: [14.506787216238807, 121.28920014013603] },
            { name: "Vista Plant Nursery (Kitchen)", coords: [14.506532740011378, 121.28974999295512] },
            { name: "Rezie Eatery", coords: [14.512566552545724, 121.28093623980926] },
            { name: "Bay Cove Events Place & Pizzeria", coords: [14.51036218688482, 121.28161635248289] },
            { name: "Simplé Restaurant", coords: [14.510209034081731, 121.28151906590955] },
            { name: "MAXI CARINDERIA", coords: [14.509073271057467, 121.28219961427523] },
            { name: "Ayen Food Express - Tanay", coords: [14.508999826183123, 121.28217875158548] },
            { name: "EsquinittaWings Tanay", coords: [14.507446491923954, 121.28294677572505] },
            { name: "Bikol Nis Lugawan", coords: [14.505615952660797, 121.28275083965474] },
            { name: "Ka Fely's Palabok Halo Halo Sizzling atbp.", coords: [14.503285808143223, 121.28323691238563] },
            { name: "Pink and Blue Music Hub Restaurant", coords: [14.50112991986906, 121.28338761626148] },
            { name: "Pizzafy - Tanay", coords: [14.501058508927219, 121.28370009361204] },
            { name: "Rizal Lomi Eatery", coords: [14.50093321513151, 121.28378190098267] },
            { name: "MANG ROJED", coords: [14.499505694624558, 121.28432777613482] },
            { name: "VIZEN FOODS (Vizen Food Cart)", coords: [14.499527945685392, 121.28479412528048] },
            { name: "Boss JCE Eatery", coords: [14.499453937448404, 121.28486252160675] },
            { name: "WESHLEY'S FOOD PARK", coords: [14.499102813974003, 121.28421965834308] },
            { name: "Andok's Litsong Manok", coords: [14.49834897827265, 121.28434599547371] },
            { name: "Street Vibes Bistro Tanay", coords: [14.49805113022914, 121.2845109128369] },
            { name: "Zayne's Grill House", coords: [14.497951267473113, 121.28439827171164] },
            { name: "Ka Maring's Carinderia", coords: [14.497988475153162, 121.28488508821246] },
            { name: "Raskie’s Kainan at Lugawan Tanay", coords: [14.497777172478036, 121.28452863383362] },
            { name: "JC Lomi Batangas", coords: [14.495658481400202, 121.27877794480722] },
            { name: "Unliwigs", coords: [14.495990520020307, 121.28128925167977] },
            { name: "TapSi - Gaw Meals Atbp.", coords: [14.490178133952693, 121.28510758279175] },
            { name: "Jazzy Pares and Goto Hauz", coords: [14.488594518264913, 121.28377798533747] },
            { name: "Buko Co. Tanay Public Market", coords: [14.492335697484393, 121.28831941726561] },
            { name: "HARLYN'S EATERY", coords: [14.492325999774652, 121.2883498741011] },
            { name: "Jun And Rok Lumpia Wrapper", coords: [14.492619531707323, 121.288867695116] },
            { name: "Hong Kong Style Noodles & Dimsum - Tanay", coords: [14.493221563921953, 121.28948186054242] },
            { name: "PAREServe", coords: [14.493152573544068, 121.2886626382556] },
            { name: "BOK'S LOMIHAN", coords: [14.493433155828376, 121.28755608468616] },
            { name: "J&J Lutong Bilao", coords: [14.493599184747364, 121.2861409038128] },
            { name: "Baldo's Korner", coords: [14.494095757367623, 121.28441583930967] },
            { name: "Kheng-Chan's LOMIHAN", coords: [14.494995311470632, 121.28428004213494] },
            { name: "Tokyo Tokyo Tempura Treats", coords: [14.495993762563046, 121.2861028720703] },
            { name: "Sisig Corner", coords: [14.497465235707361, 121.28475338841729] },
            { name: "Wow Chixx Oven Roated And Fried Chicken", coords: [14.49714445712375, 121.28430782194441] },
            { name: "Dimsum Factory", coords: [14.497008843778872, 121.28428505661701] },
            { name: "Papa’s Grill", coords: [14.496687174747173, 121.28429460496325] },
            { name: "Kainan Sa Mendez 2", coords: [14.492317716197574, 121.2858153167039] },
            { name: "Double RR Pizza Haus", coords: [14.492833616882685, 121.2858629847747] },
            { name: "Apo ni Balot food options", coords: [14.495474102037582, 121.28617007283066] },
            { name: "Michael's Fried Itik", coords: [14.495891541645156, 121.28326389937038] },
            { name: "Kumpares Tanay", coords: [14.496146581669553, 121.2830898351075] },
            { name: "AW All About Hotness", coords: [14.49595859166847, 121.28272851403548] },
            { name: "Esquinex Food House", coords: [14.497484689711046, 121.28057348888603] },
            { name: "Pares Hane", coords: [14.493752074199481, 121.2923585203831] },
            { name: "Malyn's Eatery", coords: [14.493769927525603, 121.28888804312669] },
            { name: "Ka Bebang's Restaurant", coords: [14.494507036012834, 121.29105243226924] },
            { name: "Jollibee FT Catapusan Plaza Aldea", coords: [14.494999531328693, 121.29006855036886] },
            { name: "D.I.Y. Korean Ramyun Atbp.", coords: [14.495054064812452, 121.29031397248079] },
            { name: "Franks N Burgers", coords: [14.495085226797155, 121.29002697613133] },
            { name: "Takoyaken Takoyaki Tanay Town in Rizal", coords: [14.495238439829635, 121.2896955012964] },
            { name: "Tanay Market Carinderia", coords: [14.494523661181455, 121.29060778765728] },
            { name: "AMEJJ EATERY", coords: [14.494710958081706, 121.2900381535136] },
            { name: "Dimsum Panda", coords: [14.495169724633923, 121.28985230582173] },
            { name: "McDonald's Tanay", coords: [14.495450648419657, 121.28922993468883] },
            { name: "Nakumura Japanese Food Corner", coords: [14.495786045705467, 121.28928981720424] },
            { name: "Golden Chef Food House", coords: [14.496436873694737, 121.28823000936124] },
            { name: "Bouchon Belly Silogan", coords: [14.496441418122728, 121.287436746045] },
            { name: "Chooks-to-Go", coords: [14.497125853548026, 121.28608024526945] },
            { name: "ZL litson Manok Tanay", coords: [14.497149786651654, 121.28603877914419] },
            { name: "Dolora's Hauz of Pancit Malabon (Plaza Aldea Tanay Branch)", coords: [14.497194564709558, 121.28595265719174] },
            { name: "KUYA C TANAY", coords: [14.497042904820326, 121.28582205621817] },
            { name: "Cha Cha's Pizza", coords: [14.497114317054537, 121.28575902430963] },
            { name: "EGGDROP TNY", coords: [14.49714807555724, 121.2857174500721] },
            { name: "Eating Counter", coords: [14.497179886449322, 121.28567855804343] },
            { name: "Yeobo Grill Tanay", coords: [14.497423986211386, 121.28534194080474] },
            { name: "Kusina ni Z", coords: [14.502375539709842, 121.286390388543] },
            { name: "Sisig Ni Law", coords: [14.503077233658667, 121.28764539343648] },
            { name: "21 Food Express", coords: [14.503097440743312, 121.28800889248942] },
            { name: "R. D. R. Pancit Guisado and Lomi Batangas", coords: [14.500007748115953, 121.28473177606453] },
            { name: "Ash's Lomi", coords: [14.50023405795787, 121.28495717635263] },
            { name: "Nerrie's Food Trip", coords: [14.500303833347823, 121.28492019249477] },
            { name: "RAMEN HAUZ", coords: [14.500359329677083, 121.28514982788116] },
            { name: "COCO'S KAINAN", coords: [14.500388619377842, 121.28519125565421] },
            { name: "Mamang Susan's Carinderia", coords: [14.50103586287129, 121.28682085874135] },
            { name: "Pot Pot's Chicken", coords: [14.500913090212388, 121.28655530511713] },
            { name: "Ka Nida's Eatery", coords: [14.50074462510818, 121.28622841089327] },
            { name: "LEON KARINDERIA", coords: [14.503445362771775, 121.2907282256992] },
            { name: "Lomi House", coords: [14.500859856551722, 121.28706425427762] },
            { name: "Kulas and diego goto house", coords: [14.501768072986179, 121.28804693258046] },
            { name: "CooKing Ng Ina'MoOo", coords: [14.50230446345187, 121.28931658439795] },
            { name: "Irene's Lomi House", coords: [14.503080852949518, 121.29058022454129] },
            { name: "Siomai Co. Tanay", coords: [14.498996670367687, 121.28570594698654] },
            { name: "Angel's Hamburger", coords: [14.499077170720232, 121.28570192367319] },
            { name: "Busog, Lusog, Tulog", coords: [14.49913239479358, 121.28607070368017] },
            { name: "Silog", coords: [14.500660253892436, 121.2881109663207] },
            { name: "Chualong Lindgren Complex", coords: [14.497925673297322, 121.28546633851256] },
            { name: "M.V. Lomi Batangas", coords: [14.498034862047085, 121.28562655780789] },
            { name: "Tita Eva's Lugawan", coords: [14.49819084588397, 121.28583421634721] },
            { name: "Pogpog Fried Chicken", coords: [14.498365027708367, 121.28605977648525] },
            { name: "Sawasdee Tanay Thai Restaurant", coords: [14.498951495875447, 121.28703882196776] },
            { name: "Japz Lomi House", coords: [14.496936287933323, 121.28722722418394] },
            { name: "ate's carinderia", coords: [14.49241793975735, 121.28850590154934] },
            { name: "Rose Canteen", coords: [14.495079059323244, 121.29094038158308] },
            { name: "Cluck Sarap-Poblacion Tanay Rizal", coords: [14.495058933874734, 121.2909913435531] },
            { name: "Minute Burger Tanay", coords: [14.495290701027955, 121.29100542515118] },
            { name: "Lugaw Republic - Tanay Rizal", coords: [14.494999786863946, 121.29107727444459] },
            { name: "SIOPAO STORE", coords: [14.495187407959854, 121.29117852783236] },
            { name: "Mang Inasal Tanay Town Center", coords: [14.495195338806319, 121.29133555130869] },
            { name: "Yuki Takoyaki", coords: [14.495562394151813, 121.29130147397167] },
            { name: "Greenwich Pizza", coords: [14.495238924656977, 121.29165836629919] },
            { name: "Turks - Tanay", coords: [14.495307091436908, 121.29170329330266] },
            { name: "Andok's", coords: [14.49549876648747, 121.29162172369303] },
            { name: "KFC", coords: [14.49575177672245, 121.29140568295995] },
            { name: "Kowloon House Tanay", coords: [14.495822540168392, 121.29123066882136] },
            { name: "Ribsarap Tanay", coords: [14.496258991721302, 121.29171352833173] },
            { name: "Anyhaw & Silog", coords: [14.49790439452685, 121.29312416418884] },
            { name: "Sisig Hauz", coords: [14.49910054178686, 121.29394445567978] },
            { name: "Sr.Pedro", coords: [14.499642191705107, 121.29440852852733] },
            { name: "Chowking Tanay Highway", coords: [14.50017138835947, 121.29510142770782] },
            { name: "Rain Food House", coords: [14.500566834601594, 121.29502727823952] },
            { name: "Jollibee Tanay Highway", coords: [14.50069485346681, 121.29532093054337] },
            { name: "FRYDAY MUNCH", coords: [14.50057805906665, 121.29466812087391] },
            { name: "Tbones SteakHouse - Tanay Rizal Branch", coords: [14.501079530174376, 121.29439035455238] },
            { name: "Kimchee Express- Tanay", coords: [14.501318423300033, 121.29421742482123] },
            { name: "Bulalohan", coords: [14.501725819012503, 121.29421406610638] },
            { name: "Barkadahan's Kainan (Formerly Neng's Corner)", coords: [14.501847217230702, 121.29402899368505] },
            { name: "Balbakwahan Sa Tanay", coords: [14.50268407341859, 121.2927631557587] },
            { name: "Weshley Kainan", coords: [14.502876443124281, 121.2925758033374] },
            { name: "Pai Anol's Diner", coords: [14.504695584000858, 121.2909669460633] },
            { name: "Violy's Canteen", coords: [14.505382783891234, 121.28996522151279] },
            { name: "Amarah's Corner Tanay", coords: [14.50572678847894, 121.28958653658286] },
            { name: "ACHA'S KAINAN", coords: [14.50576703743596, 121.2896093353589] },
            { name: "L.C. Big Mak! Burger, Inc.", coords: [14.505841043563656, 121.28958720713509] },
            { name: "Master Grilled Liempo", coords: [14.505929331545993, 121.28950405865514] },
            { name: "Chen's Kitchen - Tanay", coords: [14.50862909421808, 121.28755543397298] },
            { name: "Camp Kay Buli Restaurant", coords: [14.511111808056931, 121.2857219749722] },
            { name: "HIGHWAY FOOD STOP", coords: [14.512673052392499, 121.28427310091395] },
            { name: "SeoulFul Sizzlers", coords: [14.512763285116216, 121.28433210951081] },
            { name: "Gadi's Lomi House", coords: [14.512885145313497, 121.28404945134776] },
            { name: "Laura's Food And Luxury Wood Work", coords: [14.513068856329559, 121.28394484519565] },
            { name: "Mang Vic's Bulaluhan- Tanay Branch", coords: [14.513110402262123, 121.28402933477751] },
            { name: "Fiesta Pangilenian", coords: [14.513340527644672, 121.28437156421971] },
            { name: "Side Walk Food Cart", coords: [14.511532683301223, 121.28567871128192] },
            { name: "Pares Hunters", coords: [14.509419275318388, 121.28719635307438] },
            { name: "Kapihan Camp-Buli", coords: [14.509113193350732, 121.28733348101035] },
            { name: "ReyVan Food House", coords: [14.50903594248045, 121.2874575331771] },
            { name: "Yan - Yan’s Lugaw at Mami", coords: [14.508384826924749, 121.28804338975867] },
            { name: "Bok's Lomi Batangas", coords: [14.50821474458332, 121.28810105725104] },
            { name: "Talisay Restaurant Tanay", coords: [14.506249050596928, 121.289128214114] },
            { name: "Kim's Bulaluhan", coords: [14.50632565326368, 121.28913223742744] },
            { name: "Enzo lomihan", coords: [14.506478963825474, 121.28943500762172] },
            { name: "Maxs Restaurant", coords: [14.5062135834322, 121.28972725252578] },
            { name: "Vista Plant Nursery (Kitchen) HALAMANAN", coords: [14.506494676189734, 121.28975340406328] },
            { name: "Jaxi Big Bites", coords: [14.506038116008591, 121.29005913802965] },
            { name: "Vamos Ramen", coords: [14.505846609043372, 121.29001152882083] },
            { name: "Garage 54 Food Park", coords: [14.505940090430146, 121.29013021656678] },
            { name: "Chucoy's Shawarma", coords: [14.505958916537985, 121.29017916688008] },
            { name: "Pizza de NELA", coords: [14.506776829460037, 121.29065231350684] },
            { name: "JMJ TAPSILOGAN", coords: [14.50689757573661, 121.29088432458083] },
            { name: "Kabayan Lomi House", coords: [14.506784619544387, 121.29092723992399] },
            { name: "KENNEDY BBQ STATION", coords: [14.509408587072357, 121.29201672116892] },
            { name: "Jaycee's Kanawan", coords: [14.509766903423396, 121.29221041944933] },
            { name: "Cha-Cha's Pizza", coords: [14.510109337671487, 121.29092977431162] },
            { name: "Yeyi's Hot Paddle Café", coords: [14.509263800007744, 121.28743813723493] },
            { name: "La Casa Rizaliano", coords: [14.509585676211168, 121.28677516436008] },
            { name: "Mac Cafe", coords: [14.505951953800826, 121.28336346209439] },
            { name: "Garage 35", coords: [14.504151368042354, 121.28330730173347] },
            { name: "Toothless Café", coords: [14.503089575492544, 121.28325082612065] },
            { name: "Aris coffee and Tea", coords: [14.499637751005718, 121.28407124428355] },
            { name: "NATHAN'S CAFE", coords: [14.498941813258265, 121.28425184484955] },
            { name: "LIFE IN A CUP", coords: [14.49800591918024, 121.28468215113922] },
            { name: "CALLE Co.", coords: [14.497862694496296, 121.28460439020459] },
            { name: "The Krt Claritea Milktea", coords: [14.495778019770924, 121.2782165076511] },
            { name: "KOPI NI LOLO", coords: [14.490740216276716, 121.28018958647311] },
            { name: "Tearadoor", coords: [14.49182018448806, 121.28509391459865] },
            { name: "28 Blend", coords: [14.496285511465985, 121.28302680319898] },
            { name: "Sweet Holes", coords: [14.496761800069184, 121.28254774956326] },
            { name: "Bings Cafe by Coffee Bing", coords: [14.493511541065015, 121.29286721347202] },
            { name: "Fashion Cafe", coords: [14.494044219350199, 121.29229817068344] },
            { name: "PICKUP COFFEE - Cleanfuel Tanay", coords: [14.494413295519632, 121.29068758337127] },
            { name: "TEAndahan Tanay, Rizal", coords: [14.49522675409055, 121.2902560829983] },
            { name: "Black Cup Coffee & Tea Tanay Rizal", coords: [14.496320629581097, 121.28893726115408] },
            { name: "brew, pls", coords: [14.496729989116686, 121.28668941555836] },
            { name: "Sirangan Coffee", coords: [14.501152795156166, 121.28461397123266] },
            { name: "4G's ChaiBucks - Tanay", coords: [14.501599056778588, 121.28539023980896] },
            { name: "Bo•bean cafe tanay branch", coords: [14.501991292830068, 121.2856476877541] },
            { name: "Kata Cafe'", coords: [14.504998747185846, 121.29034461916787] },
            { name: "OMOSHIROIE CAFE ESPRESSO", coords: [14.499626355633568, 121.28529559977726] },
            { name: "Numnums", coords: [14.500549332724551, 121.28772785723972] },
            { name: "GOCA Tea and Coffee - Tanay", coords: [14.498922661953237, 121.2857810488355] },
            { name: "Skye's Cafe & Bistro", coords: [14.500070877304177, 121.28748017404489] },
            { name: "Emprezz Milk Tea House", coords: [14.498085123518965, 121.28575365915962] },
            { name: "Big Brew Tanay Plaza Branch", coords: [14.498119786597055, 121.28592998989977] },
            { name: "Kofee Manila - Tanay Bayan", coords: [14.494910780969516, 121.290668160172] },
            { name: "Clodio Café", coords: [14.49593244159448, 121.29112143069085] },
            { name: "Tea Gumps Tanay", coords: [14.496275102086612, 121.29174899183417] },
            { name: "Aya's Cafe", coords: [14.499767589896493, 121.29475408164285] },
            { name: "VistaBarista Coffee & Bakeshop", coords: [14.500954529928762, 121.29517407960196] },
            { name: "BCC Coffee", coords: [14.507683652072014, 121.28821245658408] },
            { name: "Cafe Musta", coords: [14.508381217142626, 121.28759052123259] },
            { name: "Kape Rizaliano", coords: [14.509549589318398, 121.28681305646565] },
            { name: "MOMMY ANNE Ktv Bar", coords: [14.511438124547519, 121.28147879463224] },
            { name: "Rochelle Star Club & Resto Bar", coords: [14.511044456364655, 121.2813786417079] },
            { name: "Kamalig KTV & Restaurant", coords: [14.508073665568853, 121.2878143210298] },
            { name: "Lydia Segarra Cakes & Confections", coords: [14.507175746351024, 121.2823990556919] },
            { name: "Dessert Grounds", coords: [14.5029341959533, 121.28333686220579] },
            { name: "Treats", coords: [14.501228257800136, 121.28398405183115] },
            { name: "Chad and Che BAKE SHOP", coords: [14.499145660918948, 121.28437924977105] },
            { name: "Emmanuel's Bakery", coords: [14.495699465838342, 121.27837408742239] },
            { name: "Food Thrift", coords: [14.488710298569613, 121.28404096193681] },
            { name: "Pandepublika Hot Pandesal", coords: [14.492294778708027, 121.28828672282137] },
            { name: "ROY and MAY BAKESHOP", coords: [14.492465741202471, 121.2885651789733] },
            { name: "Layagan Bakery", coords: [14.492860210293301, 121.28931387426948] },
            { name: "Josie-Ron's Bakery", coords: [14.49348102807089, 121.28693237747865] },
            { name: "Doux Cakes and Pastries", coords: [14.494429656429258, 121.28498653855928] },
            { name: "Trixie Mae Bakeshop", coords: [14.497777527114271, 121.28505211749429] },
            { name: "Mister Donut", coords: [14.494537619190147, 121.28972500561115] },
            { name: "Dunkin' Donuts", coords: [14.494322673426634, 121.2895003510588] },
            { name: "Don Benito's Cassava Cake and Pichi Pichi", coords: [14.495709439394144, 121.28940045832027] },
            { name: "B&M Cake House", coords: [14.496611509507733, 121.2870847061119] },
            { name: "Orlydoughs", coords: [14.501194509499431, 121.28456834971912] },
            { name: "Zagu", coords: [14.497481115902342, 121.28528092055286] },
            { name: "Papa Tak's Bakery", coords: [14.500508643905587, 121.28528125611685] },
            { name: "Ka Linda's Special Puto Bumbong", coords: [14.500854013832226, 121.28725938498151] },
            { name: "Baked Treats by alli", coords: [14.50303735758101, 121.29069354786698] },
            { name: "Connie's Bakery", coords: [14.500334812438266, 121.28731357563959] },
            { name: "Lola Paning's Original Tanay Puto Bumbong & Suman", coords: [14.50135395781321, 121.28890612878865] },
            { name: "Emata's Bakery", coords: [14.5029388811733, 121.2904411554273] },
            { name: "Florels", coords: [14.49869544297933, 121.28596209794236] },
            { name: "InstaSnack", coords: [14.501388234459558, 121.28934221785718] },
            { name: "Gutierrez Bakery", coords: [14.497886677302212, 121.28539383704371] },
            { name: "In The Zcoops", coords: [14.498432620617358, 121.28617076639442] },
            { name: "Red Ribbon, Tanay", coords: [14.494816454531849, 121.29046596586076] },
            { name: "Goldilocks", coords: [14.495267400843336, 121.29146899120384] },
            { name: "Potato Corner", coords: [14.495214879344855, 121.29136522993745] },
            { name: "LOVE IT Chocolates", coords: [14.495785535434194, 121.29121457556766] },
            { name: "The Chocolate Store", coords: [14.49588050514943, 121.29109192639243] },
            { name: "MedMart Snack House", coords: [14.496253473482502, 121.2920306995477] },
            { name: "Max's Corner Bakery", coords: [14.506352506918144, 121.28962666968816] }
                // Add more restaurants as needed
        ],

        schools: [
            { name: "RIKA HILLS ACADEMY", coords: [14.510995841513147, 121.28161463377651], link:"https://www.google.com/maps/place/RIKA+HILLS+ACADEMY/@14.5108002,121.279673,16z/data=!4m6!3m5!1s0x3397ea691358f2b5:0x244af7988b79c323!8m2!3d14.5109976!4d121.2816149!16s%2Fg%2F11y751qdxf?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Blessed Hope Christian School of Tanay INC", coords: [14.504975365060712, 121.28174624493325], link:"https://www.google.com/maps/place/Blessed+Hope+Christian+School+of+Tanay+INC/@14.5049819,121.2791709,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ea6b37a74725:0x2ee01729274a72b8!8m2!3d14.5049767!4d121.2817458!16s%2Fg%2F1hhwl0xq9?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "STI ACADEMIC CENTER", coords: [14.50873271387205, 121.28726756432658], link:"https://www.google.com/maps/place/STI+ACADEMIC+CENTER/@14.5088605,121.2832772,17z/data=!4m6!3m5!1s0x3397ea418a3d3457:0x4b86b310add17c6e!8m2!3d14.5087312!4d121.2872674!16s%2Fg%2F11vw_x19bh?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Greenfield Montessori School", coords: [14.504488997018386, 121.28746620589993], link:"https://www.google.com/maps/place/Greenfield+Montessori+School/@14.5088605,121.2832772,17z/data=!4m6!3m5!1s0x3397ea406f048fab:0xee91787dba59d72e!8m2!3d14.5045123!4d121.2875012!16s%2Fg%2F1hc23h9j4?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "San Ildefonso College", coords: [14.498872998395916, 121.28521695362856], link:"https://www.google.com/maps/place/San+Ildefonso+de+Toledo+Parish+Church+-+Tanay,+Rizal+(Diocese+of+Antipolo)/@14.4985027,121.2821199,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ea160607dc03:0xe69647c9eff0932f!8m2!3d14.4984975!4d121.2846948!16s%2Fg%2F11bwh5tr89?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Marciana P. Catolos National High School", coords: [14.497466833481905, 121.2809405146004], link:"https://www.google.com/maps/place/Marciana+P.+Catolos+National+High+School/@14.4976431,121.2785191,17z/data=!4m6!3m5!1s0x3397ea16db22b031:0xf5d945fbcf20f6b7!8m2!3d14.4974662!4d121.2809089!16s%2Fg%2F12qgldc3b?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "St. Therese School of Tanay", coords: [14.49586719646437, 121.28087614158564], link:"https://www.google.com/maps/place/St.+Therese+School+of+Tanay/@14.4959008,121.2783149,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ea17392bd387:0x4a94b1d2feba468c!8m2!3d14.4958956!4d121.2808898!16s%2Fg%2F11c72q4yj9?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Patricio Jarin Memorial Elementary School", coords: [14.495659450549972, 121.27928827388857], link:"https://www.google.com/maps/place/Patricio+Jarin+Memorial+Elementary+School/@14.4956984,121.2767203,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ea174b673c95:0x38437fea06f6d36b!8m2!3d14.4956932!4d121.2792952!16s%2Fg%2F1v3kf0dk?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Tanay West Integrated National High School", coords: [14.492273164625557, 121.28357980824366], link:"https://www.google.com/maps/place/Tanay+West+Integrated+National+High+School/@14.492296,121.2810245,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ea18469bbe25:0x67bb072fc27c3302!8m2!3d14.4922908!4d121.2835994!16s%2Fg%2F11g6mvr_51?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Tanay National High School", coords: [14.498075570467174, 121.29261271550536], link:"https://www.google.com/maps/place/Tanay+National+High+School/@14.4980792,121.2900481,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ea395d9deb8f:0xb0978a226eab02b5!8m2!3d14.498074!4d121.292623!16s%2Fg%2F11bwny18cm?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "EJIST Tanay", coords: [14.497764490643167, 121.29326872633987], link:"https://www.google.com/maps/place/EJIST+Tanay/@14.4980792,121.2900481,17z/data=!4m6!3m5!1s0x3397eb7de2c03b73:0x27cfdb001be9ef2!8m2!3d14.4977804!4d121.293285!16s%2Fg%2F11y2ndmzrn?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Sunrise Development School", coords: [14.504928735801489, 121.29843251764407], link:"https://www.google.com/maps/place/Sunrise+Development+School/@14.5050039,121.2957542,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ea4e42a3a577:0xadf48a8a2f5ddd36!8m2!3d14.5049987!4d121.2983291!16s%2Fg%2F11zlq4t0f?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Tanay Ville Elementary School", coords: [14.519219113505743, 121.28735517680997], link:"https://www.google.com/maps/place/Tanay+Ville+Elementary+School/@14.5191994,121.284783,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ea3d92e4beb1:0xe72ae2807347f462!8m2!3d14.5191942!4d121.2873579!16s%2Fg%2F11x9r01dt?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3Dhttps://www.google.com/maps/place/Tanay+Ville+Elementary+School/@14.5191994,121.284783,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ea3d92e4beb1:0xe72ae2807347f462!8m2!3d14.5191942!4d121.2873579!16s%2Fg%2F11x9r01dt?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Marciana P. Catolos Elementary School", coords: [14.497580206268818, 121.28111705037297], link:"https://www.google.com/maps/place/Marciana+P.+Catolos+Elementary+School/@14.4975507,121.2813771,19z/data=!4m6!3m5!1s0x3397ea3d92e4beb1:0x9470c7435817489d!8m2!3d14.4976379!4d121.281094!16s%2Fg%2F11ycydtq9?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Tanay Sikaran Martial Art School", coords: [14.494059151209315, 121.27936437641958], link:"https://www.google.com/maps/place/Tanay+sikaran+martial+art+school/@14.4976431,121.2785191,17z/data=!4m6!3m5!1s0x3397eb878e6d02c9:0x5c4b3e5162350795!8m2!3d14.4940643!4d121.2793683!16s%2Fg%2F11v9_v8tf7?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Wawa Elementary School", coords: [14.492846708110992, 121.28501516612037], link:"https://www.google.com/maps/place/Wawa+Elementary+School/@14.4940695,121.2767934,17z/data=!4m6!3m5!1s0x3397ea180fa4ae7f:0x650c591da99c7f45!8m2!3d14.4928478!4d121.2850143!16s%2Fg%2F1tctv2gy?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Lamb Of Christ Magistrate School", coords: [14.495203654590254, 121.27828610788598], link:"https://www.google.com/maps/place/Lamb+Of+Christ+Magistrate+School/@14.492853,121.2824394,17z/data=!4m6!3m5!1s0x3397ea1098698ee5:0xf73d54b63b6d0a1e!8m2!3d14.495205!4d121.278291!16s%2Fg%2F1hf4ln582?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Rizal Marine & Technocomputer College (RMTC)", coords: [14.497968075452127, 121.28573624474681], link:"https://www.google.com/maps/place/Rizal+Marine+%26+Technocomputer+College+(RMTC)/@14.4979762,121.2831621,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ea3df70ef897:0xa043f90b4be9d41c!8m2!3d14.497971!4d121.285737!16s%2Fg%2F1pzx6lsmc?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Tesda Accredited School", coords: [14.494977413010075, 121.29089940915841], link:"https://www.google.com/maps/place/Tesda+Accredited+School/@14.4949862,121.2887934,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ea3c838acd85:0x809364df96e5032!8m2!3d14.494982!4d121.290897!16s%2Fg%2F1pzpn9dbw?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Asian Institute of Computer Studies, Tanay Branch", coords: [14.494069213979383, 121.29135220145332], link:"https://www.google.com/maps/place/Asian+Institute+of+Computer+Studies,+Tanay+Branch/@14.4937603,121.2901693,17.25z/data=!4m6!3m5!1s0x3397ea3c8251e4bf:0x27e6c3336b7316e1!8m2!3d14.4941007!4d121.291342!16s%2Fg%2F11bzvw61xv?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Gratia Divina School Incorporated", coords: [14.50487361577407, 121.28930558167673], link:"https://www.google.com/maps/place/Gratia+Divina+School+Incorporated/@14.4937603,121.2901693,17.25z/data=!4m6!3m5!1s0x3397ea40ec481967:0xa5f8d3d4f4aa05a3!8m2!3d14.504886!4d121.28932!16s%2Fg%2F1hdz84pmh?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Don Domingo Capistrano Memorial Elementary School", coords: [14.497573530888605, 121.28926734798847], link:"https://www.google.com/maps/place/Don+Domingo+Capistrano+Memorial+Elementary+School/@14.5048912,121.2867451,17z/data=!4m6!3m5!1s0x3397ea3d92e4beb1:0xac3abf1a28652c!8m2!3d14.4976814!4d121.2893401!16s%2Fg%2F11y7y_zqf?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Niftylink Driving School", coords: [14.502257885093874, 121.29687031504896], link:"https://www.google.com/maps/place/Niftylink+Driving+School+-+Tanay/@14.4976866,121.2867652,17z/data=!4m6!3m5!1s0x3397eb5de11de537:0xd6e5a915edc9f516!8m2!3d14.5022789!4d121.2968707!16s%2Fg%2F11smwf38h3?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Academy Of St. Peter", coords: [14.513311370748367, 121.28354862406371], link:"https://www.google.com/maps/place/Academy+Of+St.+Peter,+Tanay/@14.5022841,121.2942958,17z/data=!4m6!3m5!1s0x3397ea40dc6bd8a7:0x769d526a7e83ba49!8m2!3d14.5133055!4d121.2835351!16s%2Fg%2F11q2ykv2x2?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" }
        ],

        hospitals: [
            { name: "DELGADO DENTAL CLINIC", coords: [14.49357548849613, 121.28772675960529], link:"https://www.google.com/maps/place/DELGADO+DENTAL+CLINIC/@14.4935794,121.2851515,17z/data=!3m1!4b1!4m6!3m5!1s0x3397eb3815769ec7:0x15261e5609dac9dd!8m2!3d14.4935742!4d121.2877264!16s%2Fg%2F11wmnhv8jq?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Tanay General Hospital", coords: [14.495546203173589, 121.28961973988355], link:"https://www.google.com/maps/place/Tanay+General+Hospital/@14.495556,121.28704,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ea3c8ab9f1a3:0x66435e4b77a32782!8m2!3d14.4955508!4d121.2896149!16s%2Fg%2F1tgcpdfm?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Tanay Municipal Health Center", coords: [14.499974033576404, 121.28368332921121], link:"https://www.google.com/maps/place/Tanay+Municipal+Health+Center/@14.495556,121.28704,17z/data=!4m6!3m5!1s0x3397ea15c4acc793:0x1a82c27a6ca07001!8m2!3d14.499992!4d121.2836998!16s%2Fg%2F11clwkhcj7?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Queen Angel Maternity & Lying In Clinic", coords: [14.499743569712992, 121.28691002655803], link:"https://www.google.com/maps/place/Queen+Angel+Maternity+%26+Lying+In+Clinic/@14.4999972,121.2811249,17z/data=!4m6!3m5!1s0x3397ea3e1538a72d:0xc327e0732787f789!8m2!3d14.4997635!4d121.2868924!16s%2Fg%2F11c708qql2?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Clinica Dental 103 Dr. Glorichelle C. Vista- Quitiong", coords: [14.503512759943042, 121.28842614575746], link:"https://www.google.com/maps/place/Clinica+Dental+103/@14.4997687,121.2843175,17z/data=!4m6!3m5!1s0x3397ea40800feebb:0x236623b45ee9c6b6!8m2!3d14.5035316!4d121.2884264!16s%2Fg%2F11csq3h541?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Rizal Provincial Hospital System Tanay Annex", coords: [14.512832697881509, 121.2848920757302], link:"https://www.google.com/maps/place/Rizal+Provincial+Hospital+System+Tanay+Annex/@14.5128072,121.2823166,17z/data=!3m1!4b1!4m6!3m5!1s0x3397eb1c214bf2c9:0xcf33e9859d70659!8m2!3d14.512802!4d121.2848915!16s%2Fg%2F11j0p57_3p?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
        ],

        supermarkets: [
            { name: "Savemore Market Tanay", coords: [14.494923755057028, 121.29101374611793], link:"https://www.google.com/maps/place/Savemore+Market+Tanay/@14.4952609,121.2898565,18.75z/data=!4m6!3m5!1s0x3397ea3b81ff8137:0x747d54ea41473a88!8m2!3d14.4949124!4d121.2909768!16s%2Fg%2F1tgyt76n?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Puregold Tanay", coords: [14.495409362447491, 121.29047998654308], link:"https://www.google.com/maps/place/Puregold+Tanay/@14.4954077,121.2878888,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ea3c88900e75:0x64287aa63fc84e8!8m2!3d14.4954025!4d121.2904637!16s%2Fg%2F1q6cqsvtr?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D"},
            { name: "O!save Cecilio Santos Wawa", coords: [14.493692628720366, 121.28441383016784], link:"https://www.google.com/maps/place/O!save+Cecilio+Santos+Wawa/@14.4904097,121.2825258,17z/data=!4m6!3m5!1s0x3397eb003d18abb3:0x82685e58e97b2b49!8m2!3d14.4936751!4d121.2844259!16s%2Fg%2F11vz64k7x0?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Tanay Public Market", coords: [14.492771399118395, 121.28820584603434], link:"https://www.google.com/maps/place/Tanay+Public+Market/@14.4941162,121.2858534,17z/data=!4m6!3m5!1s0x3397ea22d69758bf:0x4b26b2a88a17a08!8m2!3d14.4927191!4d121.2882069!16s%2Fg%2F1tdc2rn3?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Thriftmart", coords: [14.492819436775234, 121.28927734552796], link:"https://www.google.com/maps/place/Thriftmart-+Tanay,+Rizal/@14.4927787,121.2867277,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ea22d016681d:0x421eccb79e730a17!8m2!3d14.4927735!4d121.2893026!16s%2Fg%2F1hhkb8k8m?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "DiviMart Grocery Store", coords: [14.493140797776597, 121.28928874493918], link:"https://www.google.com/maps/place/DiviMart+Grocery+Store/@14.4927787,121.2867277,17z/data=!4m6!3m5!1s0x3397eb3475188379:0xa414c1c77310f3f!8m2!3d14.4931279!4d121.2893026!16s%2Fg%2F11l7961dqj?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Sioson's Grocery", coords: [14.49402436529427, 121.2884544654388], link:"https://www.google.com/maps/place/Sioson's+Grocery/@14.4936628,121.2845926,17z/data=!4m6!3m5!1s0x3397eb2867212de5:0x13421d6b7faccd68!8m2!3d14.4940069!4d121.288477!16s%2Fg%2F11szv10s1v?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D"},
            { name: "Cesar Meat Store", coords: [14.49281266260912, 121.2881295941017], link:"https://www.google.com/maps/place/Cesar+Meat+Store/@14.4931647,121.2882871,19z/data=!4m6!3m5!1s0x3397ea22d6fef6b7:0x5285360edb678137!8m2!3d14.4928122!4d121.2881471!16s%2Fg%2F11b6hq7q_l?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" }
        ],

        stores: [
            { name: "Ruthless Queen Store", coords: [14.492580097493656, 121.2888393095168] },
            { name: "Lescano", coords: [14.492524264970262, 121.28884266227786] },
            { name: "Jennet Store", coords: [14.492452851255845, 121.28861199230623] },
            { name: "Bert & Rose Store", coords: [14.49236066260803, 121.2884410014792] },
            { name: "Nini Raymundo Grocery", coords: [14.493895494508301, 121.2921005401618] },
            { name: "DiviMart Grocery Store", coords: [14.49312898106726, 121.28929935887432] },
            { name: "Pastor Elorde Sister Alice", coords: [14.492807652963164, 121.28847383421186] },
            { name: "Cesar Meat Store", coords: [14.492810249825286, 121.28814660472031] },
            { name: "CRIS MERCADER GENERAL MERCHANDISE", coords: [14.492901139855196, 121.28828339737132] },
            { name: "Jeffple Store", coords: [14.492918234023472, 121.28765045079022] },
            { name: "Sioson's Grocery", coords: [14.494020802558236, 121.28846441560835] },
            { name: "KIYA'S", coords: [14.493258400914383, 121.28744167751589] },
            { name: "169 Hypermart", coords: [14.494545364504896, 121.28940989428673] },
            { name: "Remelanda Sari-Sari Store", coords: [14.49564534614284, 121.28899798267145] },
            { name: "Anne's Store", coords: [14.493951327273708, 121.29283679097182] },
            { name: "Tess Sari Sari Store", coords: [14.499561203432128, 121.29464977217219] },
            { name: "Mercy’s", coords: [14.499971494200084, 121.29497566055184] },
            { name: "Tindahan ni Pepay", coords: [14.497130126110356, 121.28731396614006] },
            { name: "Japan Nandemall", coords: [14.496926297882515, 121.28657407928551] },
            { name: "Liza's Sari Sari Store", coords: [14.496989270522526, 121.2873867886076] },
            { name: "Liza's Store", coords: [14.499038269896706, 121.29387032424597] },
            { name: "Liam's Sari Sari Store", coords: [14.498558513239606, 121.293408984301] },
            { name: "MJAY's Rice Store and Groceries", coords: [14.500381388409256, 121.2871001048235] },
            { name: "yinyarns", coords: [14.501068460029654, 121.28530603308907] },
            { name: "Letang’s Store", coords: [14.501124923589625, 121.28588269575093] },
            { name: "3J's Sari-Sari Store", coords: [14.500959377773551, 121.28565954068581] },
            { name: "J&B Grocypress Sari-Sari Store", coords: [14.501719034575483, 121.28775901925405] },
            { name: "Moms sari sari store", coords: [14.50325706524261, 121.29030742730916] },
            { name: "MAWILI STORE", coords: [14.503464804033788, 121.29048445310636] },
            { name: "Jenny Store", coords: [14.502092881535644, 121.28376907047262] },
            { name: "Grace Store", coords: [14.498748709158749, 121.29822446835439] },
            { name: "Three Kings Sari-Sari Store", coords: [14.503185444171269, 121.29754295154693] },
            { name: "Lolita Store", coords: [14.50610944513323, 121.30052707744932] },
            { name: "Style Merferio", coords: [14.501075041836128, 121.29556141278894] },
            { name: "Eilee Trinne Sari Sari Store", coords: [14.500941308569395, 121.29510811949446] },
            { name: "Johvonie's Sari-sari Store", coords: [14.50225719314143, 121.2965118574371] },
            { name: "Morena's Store", coords: [14.50238053862977, 121.29597943897582] },
            { name: "JH&M Sari-sari Store", coords: [14.506516507247357, 121.29098304947956] },
            { name: "Dodie’s Store", coords: [14.510405055787464, 121.28605865968231] },
            { name: "Zeiya Store", coords: [14.509731154933462, 121.28434713256837] },
            { name: "SILAYAN STORE", coords: [14.506765217097712, 121.2888939601239] },
            { name: "CanDela Sari-Sari Store", coords: [14.506284304527236, 121.28940131220637] },
            { name: "Fivien Store", coords: [14.505292937299298, 121.28961072018299] },
            { name: "Animal feed store", coords: [14.492660600179827, 121.28915782183563] },
            { name: "Ruby- Ann Store", coords: [14.492629437852601, 121.28893184572983] },
            { name: "Sala Computer Shop", coords: [14.488688936151862, 121.28588349207178] },
            { name: "Villarica Pawnshop", coords: [14.492738186985791, 121.28865823606984] },
            { name: "CHUA RTW STORE", coords: [14.492708323100983, 121.28867634097953] },
            { name: "Babylyn Store", coords: [14.492755066570705, 121.28836453420072] },
            { name: "RS 2 Smoke and Dried Fish", coords: [14.492708323100219, 121.28828809124226] },
            { name: "Metro Motorbikes Incorporated", coords: [14.49265768432929, 121.28819153172063] },
            { name: "Hbc Home of Beauty Exclusives@Tanay", coords: [14.492547966957943, 121.2882847384879] },
            { name: "Hong Kong Style Noodles & Dimsum - Tanay", coords: [14.493201682405678, 121.28947895449241] },
            { name: "Rovin Consumer Goods | Tanay", coords: [14.493441901854558, 121.28909148768] },
            { name: "Maria Gracia Pawnshop, Inc.", coords: [14.493564603036894, 121.28906801834795] },
            { name: "Tanay-Ukay-Center", coords: [14.493549671150664, 121.28901772693216] },
            { name: "Overruns", coords: [14.494094103640341, 121.28894071984297] },
            { name: "Ogie's RTW store", coords: [14.494053852562617, 121.2889474253651] },
            { name: "Hermies Drugstore Tanay RIZAL", coords: [14.494018145955298, 121.28915931986367] },
            { name: "Ema Appliances Cellphone Accessories", coords: [14.494265216185033, 121.28921757043697] },
            { name: "Kservico", coords: [14.494461277634493, 121.28980899750525] },
            { name: "Santolan Pawnshop-Sanglaan", coords: [14.494524900187141, 121.28987337052352] },
            { name: "HBC Plaza Aldea", coords: [14.494761857669735, 121.29032853737037] },
            { name: "NEW BCO TANAY", coords: [14.494630717428981, 121.29044655456582] },
            { name: "Sismars Fashion", coords: [14.49446784759438, 121.29105393664216] },
            { name: "LNF hypermart corp.", coords: [14.494310089562342, 121.29098554031667] },
            { name: "OCJ HARDWARE & CONSTRUCTION SUPPLY", coords: [14.492823544737412, 121.29379859703008] },
            { name: "CAD Plotting and Blueprinting (rmel printing services)", coords: [14.49313931694493, 121.29139506904285] },
            { name: "Nesdy Enterprises", coords: [14.492867699690352, 121.28973516732584] },
            { name: "SUPER8 TANAY RIZAL", coords: [14.49302091425096, 121.28948303969459] },
            { name: "RDB Allwin Poultry Supply", coords: [14.49288652690985, 121.28934155315838] },
            { name: "Thriftmart- Tanay, Rizal", coords: [14.492815113313863, 121.28927650958464] },
            { name: "Chard & Lyn Power Tools Trading", coords: [14.492798233732941, 121.28917458564572] },
            { name: "Naag - Malabanan", coords: [14.492714485024152, 121.28912630588172] },
            { name: "Pacifica", coords: [14.492660600179827, 121.28915782183563] },
            { name: "Fulgueras Optical Clinic", coords: [14.496944475554722, 121.28652915227893] },
            { name: "Fhvt Sporting Goods & Music Store", coords: [14.49697239126142, 121.28653183448779] },
            { name: "Data Hardware & Electrical Supply", coords: [14.497209999230968, 121.28651372957665] },
            { name: "Studio Clair", coords: [14.497441764136008, 121.28674775230286] },
            { name: "Motech - Tanay", coords: [14.499748171473293, 121.29583262627332] },
            { name: "Cordero Bolts & Nuts", coords: [14.49890154848441, 121.2940790142691] },
            { name: "For Sha", coords: [14.49864186961694, 121.29443038362753] },
            { name: "Microbike Tanay", coords: [14.49799634450733, 121.2934353154058] },
            { name: "NML Tile Center", coords: [14.497345380860825, 121.29290921819529] },
            { name: "Lance Tire Supply", coords: [14.497140233137307, 121.29275499117159] },
            { name: "Daisy Builders Home Depot", coords: [14.4970162355304, 121.29263429177368] },
            { name: "Robinsons Appliances", coords: [14.495861807852286, 121.29186488644679] },
            { name: "Bibo Shoes Tanay", coords: [14.495085773185625, 121.29162797102575] },
            { name: "Handyman", coords: [14.49516627495895, 121.29174196490158] },
            { name: "John Well Rose", coords: [14.49507408744051, 121.29111164580361] },
            { name: "Arck Tech", coords: [14.49487802653752, 121.29081056784887] },
            { name: "Trendy Kicks Tanay", coords: [14.495041627039368, 121.29081123839073] },
            { name: "Julia's Party Needs", coords: [14.494528023558374, 121.29141256571855] },
            { name: "Swift Food Cart", coords: [14.494624106558508, 121.29167475163295] },
            { name: "RSMM", coords: [14.494091556868048, 121.29224134060867] },
            { name: "Kikay's collection", coords: [14.493691642605468, 121.29279655783915] },
            { name: "Lord’s Wheel Motorcycle Parts and Accessories", coords: [14.493416474469802, 121.29357383484252] },
            { name: "EB Ever Bilena", coords: [14.496749277617726, 121.28660788101281] },
            { name: "T Shirt Printing", coords: [14.496688252518481, 121.28677887182658] },
            { name: "Farmers Express", coords: [14.496659038369279, 121.28688884238915] },
            { name: "Rose Blooms Flower Shop", coords: [14.49655386739975, 121.28689755957393] },
            { name: "Wawa Trading", coords: [14.496588924394795, 121.28713493506346] },
            { name: "F.D Sunflower", coords: [14.496239893202883, 121.28779204812207] },
            { name: "Exponent", coords: [14.4962554741124, 121.28800528372508] },
            { name: "RKP TRADING CORPORATION", coords: [14.495925624419684, 121.28853039544656] },
            { name: "SYM", coords: [14.495858107035342, 121.2885619114067] },
            { name: "TMC Poultry Supply", coords: [14.495861353063843, 121.28870809178865] },
            { name: "Yamaha 3S Shop", coords: [14.495686895343933, 121.28898926549269] },
            { name: "Samurai Paint", coords: [14.495490771220318, 121.28935144992337] },
            { name: "Motortrade Tanay", coords: [14.495149937396402, 121.28973232362176] },
            { name: "Dream Honda, Inc.", coords: [14.49508371819123, 121.28983961197575] },
            { name: "Tambayan Ng Tanay Vape Shop", coords: [14.495044116501324, 121.28993483038971] },
            { name: "Mya", coords: [14.494474600650241, 121.28919732921534] },
            { name: "Prime Ledtric Trading", coords: [14.494298664735, 121.28886942917681] },
            { name: "Haidee's House of Curtains", coords: [14.49423634053855, 121.28878695124725] },
            { name: "Cebuana Lhuillier Pawnshop", coords: [14.494112341302577, 121.28858377390183] },
            { name: "Custodio Mini-Mart", coords: [14.494091689442714, 121.28862858758981] },
            { name: "Golden Tamaraw Agri Supply", coords: [14.493674895659414, 121.28795535315105] },
            { name: "Big White Door Printing", coords: [14.493305793481683, 121.28723447688276] },
            { name: "Herbenna Tanay", coords: [14.493507505248072, 121.2882109777322] },
            { name: "Perta's Creation", coords: [14.493578918621495, 121.28841348449988] },
            { name: "Presyong Divisoria", coords: [14.493137453761163, 121.28811844152035] },
            { name: "Pamilihang Bayan Ng Tanay", coords: [14.49319198770179, 121.28863744893664] },
            { name: "Raymond & Arlyn Store", coords: [14.49286738070199, 121.28858112256557] },
            { name: "HBOMB STORE", coords: [14.498725537206306, 121.28690002398629] },
            { name: "Wana Merchandise", coords: [14.498680028011092, 121.28652425211128] },
            { name: "Jazt-Smoke Vape Shop", coords: [14.498325797958723, 121.2860817864144] },
            { name: "J & M Pawnshop", coords: [14.49810754906919, 121.28575158208542] },
            { name: "BITOY BIKE SHOP", coords: [14.497930869705424, 121.28599448227372] },
            { name: "Santolan Pawnshop Inc.", coords: [14.497699849821897, 121.2853443292318] },
            { name: "Villarica Pawnshop", coords: [14.497616102966186, 121.28544692372004] },
            { name: "Tambunting Pawnshop", coords: [14.497370883049603, 121.28573845210016] },
            { name: "JLou Tattoo Studio", coords: [14.497805353265976, 121.28607041592079] },
            { name: "MK-Z Battery and Tire Shop", coords: [14.499638269418675, 121.29436748277091] },
            { name: "AR'S Rack Thrift and Boutique Shop", coords: [14.498735744169847, 121.29366915857494] },
            { name: "Motoriz Tanay", coords: [14.498685106775042, 121.29365038310839] },
            { name: "DelMus Auto Electrical Shop", coords: [14.498363815885128, 121.29338849186041] },
            { name: "Okle Auto Supply And Japan Surplus", coords: [14.498308634017347, 121.29340458511348] },
            { name: "Son-Rise Tire & Battery Supply", coords: [14.49738818836628, 121.29273168677504] },
            { name: "MotorcycleCity Tanay", coords: [14.497497254144783, 121.29275783831125] },
            { name: "Plaza Aldea Hardware", coords: [14.496560766369447, 121.29185002750438] },
            { name: "Tannay Annex CB - XRC Resources Inc.", coords: [14.495970926119645, 121.29159968492914] },
            { name: "Motor Star", coords: [14.49588782781617, 121.2915594517965] },
            { name: "K Complex", coords: [14.495753083246429, 121.29122875182777] },
            { name: "ELV CELLPHONE AND ACCESSORIES STORE", coords: [14.49543575788901, 121.29119444863754] },
            { name: "Webox WB", coords: [14.495255096791638, 121.2909464199151] },
            { name: "1 & 1 Enterprises", coords: [14.495214196717175, 121.29076604137042] },
            { name: "Cebuana Lhuillier Pawnshop", coords: [14.49535581036824, 121.29028722369488] },
            { name: "MedAsia Philippines", coords: [14.495454633858623, 121.2898952232152] },
            { name: "Ganie Motorcycle Parts", coords: [14.495579281548988, 121.28955525322687] },
            { name: "Cuatro Hermanas Flower Shop", coords: [14.495710421230052, 121.28931050165016] },
            { name: "Trendstash Concept Store", coords: [14.495877916352224, 121.28901679976948] },
            { name: "Super Bikes Center", coords: [14.49596231307173, 121.28885720833048] },
            { name: "Low Carb/Keto Necessities and Treats Tanay", coords: [14.496012301882852, 121.28876333101398] },
            { name: "Superior Motor Corporation", coords: [14.49611163026573, 121.2887338267123] },
            { name: "Super Moringa Rizal Pick Up Center", coords: [14.496205115762924, 121.28853534324912] },
            { name: "TransCycle", coords: [14.496386243800941, 121.288277180634] },
            { name: "Fc Home Center", coords: [14.496610891034894, 121.28790426477543] },
            { name: "Personal Collection Tanay Branch", coords: [14.496571289617892, 121.28779831752612] },
            { name: "Transcycle Motor Sale", coords: [14.496959203906098, 121.28754072235901] },
            { name: "Royal Star Appliance Marketing Inc.", coords: [14.496748416302172, 121.28731101620937] },
            { name: "Motorlandia Tanay", coords: [14.496767243192606, 121.28718495238354] },
            { name: "Avon Tanay", coords: [14.496850341168763, 121.28693953024448] },
            { name: "F.D.SUNFLOWER FURNITURE", coords: [14.503316467054272, 121.28348355198163] },
            { name: "Aldea Hardware", coords: [14.503748052045273, 121.28331395545386] },
            { name: "FORYOUPAGE PHYSICAL STORE AND MAIN HUB", coords: [14.50561720213417, 121.28290145046554] },
            { name: "M&R Motorider Parts and Accessories", coords: [14.505831816542981, 121.28285726542697] },
            { name: "V&M CYCLEPARTS", coords: [14.506665024269623, 121.2827180599779] },
            { name: "Jennies trading", coords: [14.507218621037095, 121.28259529565153] },
            { name: "KP2 Auto Supply", coords: [14.505334714922572, 121.28998694463787] },
            { name: "LALENYO AUTO SUPPLY", coords: [14.505281482325538, 121.29004327102356] },
            { name: "Mark&Baby Store", coords: [14.504997142137656, 121.28955510900951] },
            { name: "K.A Online Shop", coords: [14.50452583773488, 121.29024443669748] },
            { name: "Gener's Store", coords: [14.504220722777026, 121.28972006486721] },
            { name: "Jared Store", coords: [14.504040585166448, 121.29056613851867] },
            { name: "Courtside Stuffs TNY", coords: [14.503706905503995, 121.2908477704496] },
            { name: "Wonder Prints", coords: [14.503096067544488, 121.29063733902547] },
            { name: "Rich Jacob & Rich Yaacov ALLDAYWORKS", coords: [14.502629303392974, 121.28960804130786] },
            { name: "Pocholo's Bike", coords: [14.502496869436197, 121.28948533024932] },
            { name: "VOMA Upholstery Supply", coords: [14.502303491201161, 121.28889421950875] },
            { name: "Mega Dealer Katherine Dilagan", coords: [14.502058784716064, 121.28833643846114] },
            { name: "Kloth by Anna", coords: [14.501746525286846, 121.28785229974541] },
            { name: "Jogibaabo", coords: [14.501340207179545, 121.28799396380454] },
            { name: "TRI.AE Clothing Store", coords: [14.501102469606641, 121.28915535313351] },
            { name: "Butch Vulcanizing Shop", coords: [14.501312101067429, 121.28657407825271] },
            { name: "Dear Luna Candles", coords: [14.500342650687932, 121.28501438828856] },
            { name: "Chardlyn Powertools", coords: [14.50081048178869, 121.28398556813369] },
            { name: "Littlehope Shop", coords: [14.501259287925112, 121.28544153341439] },
            { name: "LDC Barong and Gown Rentals", coords: [14.499639025281795, 121.28429474708331] },
            { name: "BB TANAY", coords: [14.499442968417588, 121.28432693358941] },
            { name: "Brilliant Skin Essentials", coords: [14.499574755004378, 121.28476279252641] },
            { name: "Beckys Channel", coords: [14.499130056105681, 121.2845850961917] },
            { name: "Jubail's Sari-Sari Store", coords: [14.50024165527304, 121.28521071858496] },
            { name: "Tables And Chairs For Hire", coords: [14.500339683373426, 121.28538372105533] },
            { name: "ALT Print Shop", coords: [14.500366949459869, 121.28549570327455] },
            { name: "EAJ VARIETY STORE", coords: [14.50070014167756, 121.28673733604091] },
            { name: "Beauty Finds RZL", coords: [14.500402162564551, 121.28710010481026] },
            { name: "ASHLEY'S STORE", coords: [14.50000615484846, 121.28652208879059] },
            { name: "Women Online Shoppe", coords: [14.500126904815357, 121.28612109855567] },
            { name: "Eastern Tanay Supermarket INC.", coords: [14.498873879571466, 121.28541348525806] },
            { name: "Clothes", coords: [14.499699306458522, 121.28662560518838] },
            { name: "Palawan Pawnshop", coords: [14.498754726511141, 121.28591012599318] },
            { name: "Donpayat Tattoo Shop", coords: [14.499312756896181, 121.28723393670506] },
            { name: "BeInked Tattoo Studio", coords: [14.499369099777283, 121.28788946828628] },
            { name: "REX SPORTS", coords: [14.500431189267735, 121.29644969255482] },
            { name: "New Tanay Hardware & Construction Supply", coords: [14.501239432230461, 121.2959883525471] },
            { name: "Car Accessories Tanay Rizal", coords: [14.502328770291015, 121.29680508519226] },
            { name: "V&C Baking and Packaging Supplies", coords: [14.5026325894843, 121.2970585539404] },
            { name: "Motopyesa", coords: [14.502728668972095, 121.29714036131003] },
            { name: "Jean Trends", coords: [14.502379410157188, 121.29801020979968] },
            { name: "Gladys Auto Supply", coords: [14.50356423609032, 121.29933649237014] },
            { name: "WDD Vape Shop and printing services", coords: [14.504834034661323, 121.29886978804582] },
            { name: "RRSANTOS WATER STATION", coords: [14.50556024182938, 121.29921279505933] },
            { name: "C and D fabshop", coords: [14.505669303584465, 121.29986591291261] },
            { name: "Sytecch Co", coords: [14.501160734958106, 121.2948398985989] },
            { name: "Ruvyrich Hardware", coords: [14.501276290779815, 121.29485599184707] },
            { name: "vierub corporation", coords: [14.501484031427854, 121.29475540901545] },
            { name: "TONGOHAN AUTO SUPPLY", coords: [14.504920124745123, 121.29110701737918] },
            { name: "Q2k Production", coords: [14.505016203240485, 121.29087366519656] },
            { name: "JCEV Meat Store", coords: [14.50634058089388, 121.29087173781286] },
            { name: "Penaranda Hardware Yero Por Kilo", coords: [14.506493786142027, 121.29086436173202] },
            { name: "Vista Home Garden", coords: [14.506686588456102, 121.2892651203697] },
            { name: "MVLW HIWAY HOMES HARDWARE", coords: [14.506839793461738, 121.2891913596217] },
            { name: "SP MOTORPARTS AND ACCESSORIES", coords: [14.507405588337244, 121.29082471719093] },
            { name: "RMRS", coords: [14.508794628360501, 121.28844460326893] },
            { name: "YD textile shop Tanay", coords: [14.509313961997586, 121.28726778408608] },
            { name: "Bonsai Hunter Garden", coords: [14.511070881376963, 121.2859122302926] },
            { name: "BJM Online Shopee", coords: [14.511938719045062, 121.28741604656683] },
            { name: "PANOY'S FURNITURE", coords: [14.511746023245614, 121.28534982285112] },
            { name: "Sachcha", coords: [14.509378008867243, 121.28503646024103] },
            { name: "Bossjj motoparts", coords: [14.508669755053203, 121.28672957487572] },
            { name: "M.L. Vulcanizing Shop", coords: [14.508500971267978, 121.2874886399783] },
            { name: "Primecircuits Electronic Parts", coords: [14.50745529956034, 121.28826453823143] },
            { name: "Sir Pen Bookbinding Services", coords: [14.505064242354742, 121.28813461430221] },
            { name: "SJF Apartment", coords: [14.504280033054236, 121.28888295058367] },
            { name: "Yum Foodies", coords: [14.50308477039311, 121.286566071658] },
            { name: "OMEGAplus Poultry Supply", coords: [14.501530427197661, 121.2849344967869] },
            { name: "Jaguar Wena Auto Shop", coords: [14.502678296987733, 121.28388637008271] },
            { name: "RJK Store", coords: [14.497989089214062, 121.28170711671022] },
            { name: "C-88 Store", coords: [14.496789115166246, 121.28344128562293] },
            { name: "Gabo Sari -Sari Store", coords: [14.497727743416359, 121.28235504579015] },
            { name: "Catambay Store", coords: [14.497551998980953, 121.28226079000223] },
            { name: "Pa Buddy's Convenience Store", coords: [14.495108136591004, 121.27873615240584] },
            { name: "Marissa's Shop and Go", coords: [14.495267841677297, 121.27867848491572] },
            { name: "New Tan Po Store", coords: [14.494220496124747, 121.28451572037311] },
            { name: "YANNIS STORE", coords: [14.494220496124747, 121.28451572037311] },
            { name: "O!save Cecilio Santos Wawa", coords: [14.493688064870687, 121.28441444020713] },
            { name: "ANING'S STORE", coords: [14.492298017759218, 121.28584537249608] },
            { name: "Tita Mers Sari-Sari Store", coords: [14.491190877436605, 121.2854682404094] },
            { name: "Piguing's Resident", coords: [14.49245714314371, 121.2820290522015] },
            { name: "Lovely Sari Sari Store", coords: [14.494624052763294, 121.28568474058184] },
            { name: "John mark mercado", coords: [14.49150120408068, 121.28447179982422] },
            { name: "PX Closet", coords: [14.491859349640183, 121.28552531786706] },
            { name: "Jennelyn Puri", coords: [14.492266855382669, 121.28602575104074] },
            { name: "King-Gem Poultry Supplies", coords: [14.49231359894585, 121.28578301114047] },
            { name: "Tess's Chicken Shop", coords: [14.494632492484296, 121.28610316516136] },
            { name: "LoZPrinting", coords: [14.494703015874299, 121.28606997427782] },
            { name: "Gonges Marketing", coords: [14.49531807347412, 121.28497146550319] },
            { name: "Roven Oil And Motor Parts", coords: [14.49517288627755, 121.28514692228799] },
            { name: "Airbase Shoes", coords: [14.49574888261822, 121.28418565067632] },
            { name: "TMVCMPC Drugstore", coords: [14.496991365659605, 121.28596369204918] },
            { name: "Ingco tools tanay", coords: [14.497230503332679, 121.28555571421143] },
            { name: "Imperial Appliance Store", coords: [14.497511607484373, 121.28514466569581] },
            { name: "Mara's Clothing", coords: [14.495598192416168, 121.28414485968494] },
            { name: "Jzone Vape Shop", coords: [14.495983113717065, 121.28165213846424] },
            { name: "Earth & Honey CA", coords: [14.49598441212826, 121.28148047710339] },
            { name: "Thon and Ace Frozen Meat Store", coords: [14.494300172609652, 121.28060476778957] },
            { name: "Mthriftedclothing", coords: [14.494439103565307, 121.28128202554609] },
            { name: "joice store", coords: [14.494594913877313, 121.28121765253384] },
            { name: "24 R Store", coords: [14.495243168555653, 121.2808796360126] },
            { name: "Kendy's Ukay ukay", coords: [14.495350940212164, 121.27920956227582] },
            { name: "Amazing Barley - Tanay", coords: [14.495230187642926, 121.27838344194299] },
            { name: "AP BOKI SPORTWARE", coords: [14.496419789977868, 121.28128983037546] },
            { name: "KMVT", coords: [14.497032637770047, 121.28236405505143] },
            { name: "jjclothing1996", coords: [14.497300990759015, 121.28302946737224] },
            { name: "A&E Pawnshop", coords: [14.497407459776142, 121.28335535575718] },
            { name: "Mia Clothing", coords: [14.498131160087382, 121.28223691335641] },
            { name: "Alldayworks", coords: [14.496870491460559, 121.28387732709784] },
            { name: "Sophia & Hans Vulcanizing Shop", coords: [14.497056812569244, 121.28394170011003] },
            { name: "On Q Collection", coords: [14.497483797681495, 121.28360072280479] },
            { name: "DVN Trading Center", coords: [14.497649192229016, 121.28421111099034] },
            { name: "Makulay Digi Pics", coords: [14.498102255392336, 121.28449571411032] },
            { name: "PRINT FOR LESS 288", coords: [14.498285084849872, 121.28431410419174] },
            { name: "Gemius", coords: [14.498365585460958, 121.28441736923219] },
            { name: "Raquel Pawnshop Inc.", coords: [14.499356542169068, 121.28412854013702] },
            { name: "M Lhuillier", coords: [14.499452623075571, 121.2841084235707] },
            { name: "Tanay rizal", coords: [14.498081710617054, 121.27850460987378] },
            { name: "teeshop", coords: [14.498228946764153, 121.28210716674944] },
            { name: "Melo/manalang compound", coords: [14.49837436724119, 121.28238343426257] },
            { name: "Ka Lolet’s Store", coords: [14.499434365010597, 121.28356473576548] },
            { name: "Napogs Bike Shop & Accessories", coords: [14.501085148557328, 121.28375504250275] },
            { name: "NGD Electronics", coords: [14.50149024299008, 121.2836531185667] }
        ],

        fires: [
            { name: "Tanay Central Fire Station", coords: [14.501177354135272, 121.28399491518783], link:"https://www.google.com/maps/place/Tanay+Central+Fire+Station/@14.5035368,121.2858515,17z/data=!4m6!3m5!1s0x3397ea15cc349645:0xf827cb0a470b4b58!8m2!3d14.50119!4d121.2841155!16s%2Fg%2F11bwhbcxp_?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Tanay Fire Sub Station", coords: [14.49293321185518, 121.28896242028308], link:"https://www.google.com/maps/place/Tanay+Fire+Sub-+Station/@14.5011952,121.2815406,17z/data=!4m6!3m5!1s0x3397ebc811b7a409:0xdb57456514d3c021!8m2!3d14.4929224!4d121.2889975!16s%2Fg%2F11fk1svkgv?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" }
        ],

        polices: [
            { name: "Tanay Police Station", coords: [14.50035048113622, 121.28253887312715], link:"https://www.google.com/maps/place/Tanay+Police+Station/@14.5003518,121.279968,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ea15cde8f187:0xc0af8b7c349a6e4a!8m2!3d14.5003466!4d121.2825429!16s%2Fg%2F11bwgwcz0g?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" }
        ],

        vets: [
            { name: "San Raphael Animal Clinic", coords: [14.499230870577062, 121.28413664169776], link:"https://www.google.com/maps/place/San+Raphael+Animal+Clinic/@14.4992325,121.2815718,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ea15a565c547:0xed16ec245f2ff89d!8m2!3d14.4992273!4d121.2841467!16s%2Fg%2F1pztymc6p?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Tanay Vet Clinic and Pet Grooming Center", coords: [14.509265188344656, 121.28188934777414], link:"https://www.google.com/maps/place/Tanay+Vet+Clinic+and+Pet+Grooming+Center/@14.5092613,121.2793406,17z/data=!3m1!4b1!4m6!3m5!1s0x3397eb8d5d35df6d:0x429389188009ba23!8m2!3d14.5092561!4d121.2819155!16s%2Fg%2F11qqyd5hk3?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Sacramento Veterinary Clinic", coords: [14.497809649924, 121.29321414085692], link:"https://www.google.com/maps/place/Sacramento+Veterinary+Clinic/@14.4978155,121.2906379,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ea3962f3063f:0x3d8963d787d42cd!8m2!3d14.4978103!4d121.2932128!16s%2Fg%2F11bwnxwwzk?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" },
            { name: "Dizon Agri Vet Ii", coords: [14.502454170898313, 121.2882427883243], link:"https://www.google.com/maps/place/Dizon+Agri+Vet+Ii/@14.5024162,121.2856699,17z/data=!3m1!4b1!4m6!3m5!1s0x3397ea3f9fab66f9:0xa0b4ffa6c4bd4ff9!8m2!3d14.502411!4d121.2882448!16s%2Fg%2F11bzvzm_lm?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" }
        ],
    }

    const categoryMarkers = {};

    const addMarkers = (data, iconUrl) => {
        return data.map(({ name, coords }) => {
            const marker = L.marker(coords, { icon: L.icon({ iconUrl, iconSize: [38, 38] }) });
            marker.addTo(map).bindPopup(name);
            return marker;
        });
    };

    // Removes POI Markers to the Map
    const removeMarkers = (markers) => {
        markers.forEach(marker => {
            if (map.hasLayer(marker)) {
                map.removeLayer(marker); // Remove each marker from the map
            }
        });
    };
    
    // Toggle Switch to show/remove POI Markers
    Object.keys(categories).forEach((category, index) => {
        const toggle = document.getElementById(`toggle${index + 1}`);
        toggle.addEventListener('change', () => {
            if (toggle.checked) {
                // Add markers and store references
                if (!categoryMarkers[category]) {
                    categoryMarkers[category] = addMarkers(categories[category], `poi/${category}.png`);
                }
            } else {
                // Remove markers when unchecked
                if (categoryMarkers[category]) {
                    removeMarkers(categoryMarkers[category]); // Remove the markers from the map
                    delete categoryMarkers[category]; // Clear stored references
                }
            }
        });
    });

    

    // GPS
    function updateLocation(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        // Add or update a marker at the user's location
        if (userMarker) {
            userMarker.setLatLng([lat, lng]);
        } else {
            userMarker = L.marker([lat, lng]).addTo(map).bindPopup("You are here");
        }
    }

    // Handle geolocation errors
    function handleLocationError(error) {
        console.log("Error with geolocation: ", error);
        alert("Unable to retrieve location. Please enable GPS and refresh the page.");
    }

    // Add a marker to show the user's location (initialize as null)
    var userMarker = null;

    // Request the user’s location continuously
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(updateLocation, handleLocationError, {
            enableHighAccuracy: true,
            maximumAge: 5000, // Cache the position for 10 seconds
            timeout: 5000       // Timeout if position not available after 5 seconds
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});
