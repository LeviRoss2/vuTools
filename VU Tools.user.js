// ==UserScript==
// @name         VU Tools
// @namespace    http://visual-utopia.com/
// @version      0.1
// @description  enter something useful
// @author       Quirinus
// @match        http://visual-utopia.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @grant        none
// ==/UserScript==

$(document).ready(function ()
{

    var url = window.location.href;
    
    if (url.indexOf('main.asp') != -1)
    {
        var citynames = $.makeArray($('.citynames'));
        var city_len = citynames.length;
        var title = '';
        var city_name = '';
        var race = '';
        var ruler_name = '';
        var ruler_name_space_pos = -1;
        var ruler_name_style = '';
        var kd_name = '';
        var name_separator_pos1 = -1;
        var name_separator_pos2 = -1;
        var name_separator_pos3 = -1;
        var name_separator_pos4 = -1;
        var name_separator_pos5 = -1;
        var titles_trim = ['Mr. ', 'Sir ' , 'Lord ' , 'Baron ', 'Duke ' , 'Prince ', 'Ms. ', 'Madam ', 'Lady ', 'Baroness ', 'Baronet ', 'Dame ', 'Duchess ', 'Princess '];
        var titles_len = titles_trim.length;
    

        var armies = $.makeArray($('.armyclick'));
        var army_len = armies.length;
        var army_name = '';
        var army_ruler_name = '';
        var army_size = '';
        var army_size_img = '';
        var army_race = '';
        var army_kd = '';
        var army_style = '';
        var army_margin = '';
        //var army_sizes = ['O Scout (1-5)', 'OO Section (8-12)', 'OOO Platoon (20-50)', 'I Company (100-300)', 'II Battalion (500-1500)', 'III Regiment (2000-4000)', 'X Brigade (Around 5000)',  'XX Division (10,000-20,000)', 'XXX Corps (Around 50,000)', 'XXXX Army (100,000-200,000)', 'XXXXX Group of armies (200,000-1,000,000)?', 'XXXXX Horde More then one million soldiers.?'];

        /*
        http://visual-utopia.com/forum.asp?f=Guides+and+Articles&t=Attacking&page=1
        The army size is shown on the map. Level 3 troops (knights, riders, etc) and special units counts as two soldiers. <------

        Scout = 1-7 soldiers
        Section = 8-11 soldiers
        Platoon = 12-50 soldiers
        Company = 51-299 soldiers
        Battalion = 300-1499 soldiers
        Regiment = 1500-3999 soldiers
        Brigade = 4000-9999 soldiers
        Division = 10,000-19,999 soldiers
        Corps = 20,000-89,999 soldiers
        Army = 90,000-199,999 soldiers
        Group of armies = 200,000-999,999 soldiers or a merge
        Horde = More then one million soldiers.
        */
        
        /*
        Military science descriptions:
        lv0 - Sticks and Leather armor
        lv1 - Tree weapons and weak armor
        lv2 - Steel weapons and armor
        lv3 - Steel weapons and strong armor
        lv4 - Enhanced weapons and handmade dwarven armor
        >=lv5 - Magic weapons and mithril armor
        */
        
        /*        
		OP    DP    OP/DP   % Success Chance
		1     99    0.01    0%
		2     98    0.02    0%
		3     97    0.03    0%
		4     96    0.04    0%
		5     95    0.05    0%
		6     94    0.06    0%
		7     93    0.08    0%
		8     92    0.09    0%
		9     91    0.1     0%
		10    90    0.11    0%
		11    89    0.12    0%
		12    88    0.14    0%
		13    87    0.15    0%
		14    86    0.16    0%
		15    85    0.18    0%
		16    84    0.19    0%
		17    83    0.2     0%
		18    82    0.22    0%
		19    81    0.23    0%
		20    80    0.25    0%
		21    79    0.27    0%
		22    78    0.28    0%
		23    77    0.3     0%
		24    76    0.32    0%
		25    75    0.33    0%
		26    74    0.35    1%
		27    73    0.37    1%
		28    72    0.39    1%
		29    71    0.41    1%
		30    70    0.43    1%
		31    69    0.45    2%
		32    68    0.47    2%
		33    67    0.49    3%
		34    66    0.52    4%
		35    65    0.54    4%
		36    64    0.56    5%
		37    63    0.59    7%
		38    62    0.61    8%
		39    61    0.64    10%
		40    60    0.67    12%
		41    59    0.69    14%
		42    58    0.72    17%
		43    57    0.75    20%
		44    56    0.79    23%
		45    55    0.82    27%
		46    54    0.85    31%
		47    53    0.89    35%
		48    52    0.92    40%
		49    51    0.96    45%
		50    50    1       50%
		51    49    1.04    55%
		52    48    1.08    60%
		53    47    1.13    65%
		54    46    1.17    69%
		55    45    1.22    73%
		56    44    1.27    77%
		57    43    1.33    80%
		58    42    1.38    83%
		59    41    1.44    86%
		60    40    1.5     88%
		61    39    1.56    90%
		62    38    1.63    92%
		63    37    1.7     93%
		64    36    1.78    95%
		65    35    1.86    96%
		66    34    1.94    96%
		67    33    2.03    97%
		68    32    2.13    98%
		69    31    2.23    98%
		70    30    2.33    99%
		71    29    2.45    99%
		72    28    2.57    99%
		73    27    2.7     99%
		74    26    2.85    99%
		75    25    3       100%
		76    24    3.17    100%
		77    23    3.35    100%
		78    22    3.55    100%
		79    21    3.76    100%
		80    20    4       100%
		81    19    4.26    100%
		82    18    4.56    100%
		83    17    4.88    100%
		84    16    5.25    100%
		85    15    5.67    100%
		86    14    6.14    100%
		87    13    6.69    100%
		88    12    7.33    100%
		89    11    8.09    100%
		90    10    9       100%
		91    9    10.11    100%
		92    8    11.5     100%
		93    7    13.29    100%
		94    6    15.67    100%
		95    5    19       100%
		96    4    24       100%
		97    3    32.33    100%
		98    2    49       100%
		99    1    99       100%
        
        approx formula:
        
        General model:
		  f(x) = 100/(exp((a-x)/b)+c)
		Coefficients (with 95% confidence bounds):
		  a =       1.013  (1.003, 1.022)
		  b =      0.1817  (0.1734, 0.1899)
		  c =       1.025  (1.015, 1.035)

		Goodness of fit:
		  SSE: 253.7
		  R-square: 0.9976
		  Adjusted R-square: 0.9975
		  RMSE: 2.074
  
  
		f(x) = 100/(exp((1.013-x)/0.1817)+1.025)
        
		*/
        
        /*
        http://visual-utopia.com/forum.asp?f=Guides+and+Articles&t=The%20Units%20Guide&page=1
        prep time formula?:
        take % chance
        look at corresponding op/dp quotient 
        divide by current prep time 
        multiply by total prep time 
        take product 
        look at corresponding % chance
        */
        
        //find total prep time formula. maybe involves: number of units on your side or op, building size of the city, number of walls (find out the % they increase). might also invovle number of enemy units or dp
        //find how % success changes with prep time, for attacks and for siege
        
        //merging an army to a prepping army halves the already prepped time (probably floored); I think it doesn't depend on the size of the merger vs mergee
        
        //unit gold upkeep = Number of troops * 2,74 ?
        //human sped up training gives ~4% less troops in total
        //1 xp = random 1-2% bonus op/dp, roughly 1.5%
        //% morale ~= % op/dp

        
        
        for (i = 0; i < army_len; i++)
        {
            title = $(armies[i]).attr('title');
            name_separator_pos1 = title.indexOf(': ');
            name_separator_pos2 = title.substring(name_separator_pos1 + ': '.length).indexOf(' ');
            name_separator_pos3 = title.substring(name_separator_pos2  + ' '.length).indexOf(' ');
            name_separator_pos4 = title.indexOf(' controlled by ');
            name_separator_pos5 = title.substring(name_separator_pos4 + ' controlled by '.length).indexOf(' of '); //needs regex in case kd name has ' of ' in it

            army_name = title.substring(0, name_separator_pos1);
            army_race = title.substring(name_separator_pos1 + ': '.length, name_separator_pos1 + ': '.length + name_separator_pos2);
            army_size = title.substring(title.indexOf(army_race) + army_race.length, name_separator_pos4);
            army_ruler_name = title.substring(name_separator_pos4 + ' controlled by '.length, name_separator_pos4 + ' controlled by '.length + name_separator_pos5);
            army_kd = title.substring(title.indexOf(army_ruler_name) + army_ruler_name.length + ' of '.length);
            army_style = $(armies[i]).attr('style');

            for (j = 0; j < titles_len; j++)
            {
                if (army_ruler_name.indexOf(titles_trim[j]) == 0)
                {
                    army_ruler_name = army_ruler_name.slice(titles_trim[j].length);
                    break;
                }
            }
            if (army_ruler_name.length > 10)
            {
                ruler_name_space_pos = army_ruler_name.indexOf(' ');
                if (ruler_name_space_pos != -1)
                {
                    army_ruler_name = army_ruler_name.substring(0, ruler_name_space_pos);
                }
                if (army_ruler_name.length > 10)
                {
                    army_ruler_name = army_ruler_name.substring(0, 9);
                }
            }



            army_race = '[' + army_race.substr(0,2) + ']';

            if ($(armies[i]).hasClass('attackingarmy') || $(armies[i]).hasClass('frozen'))
            {
                army_margin = '2em';
            }
            else
            {
                army_margin = '1em';
            }

            army_style = army_style.replace('border: 1px solid #000000;','');

            $('div[style*="arrow"]').css('-webkit-filter', 'invert(100%)').css('filter', 'invert(100%)'); //css('z-index', '2'); // and add image map with coordinates from img, rotated for each
            $('img[src*="armysize"]').css('-webkit-filter', 'invert(100%)').css('filter', 'invert(100%)').css('z-index', '2');

            $(armies[i]).before('<span style="' + army_style + 'cursor: default; color: white; font-weight: bold; font-size:0.8em; z-index: 10; text-align:center; text-shadow: black 0px 0px 1px, black 0px 0px 1px, black 0px 0px 1px, black 0px 0px 1px, black 0px 0px 1px; -webkit-font-smoothing: antialiased; margin-top: ' + army_margin + ';">' + army_race + army_ruler_name +'</span>');

            //add army size name and numbers to title

            //<img class="armyclick" onclick="pop('armyInfoE.asp?armyID=1536025')" title="Kill Him: Human scout controlled by Mr. Hero The Squire of The Collective" width="18" height="15" src="http://visual-utopia.com/KDbanners/kingdom5753.jpg" style="position: absolute; top: 4526; left:4069; border: 1px solid #000000;">
        }



        for (i = 0; i < city_len; i++)
        {
            title = $(citynames[i]).attr('title');
            city_name = citynames[i].innerHTML;
            if (title.indexOf('Your city:') !== 0)
            {
                name_separator_pos1 = title.indexOf(' city owned by ');
                name_separator_pos2 = title.lastIndexOf(' of ');
                name_separator_pos3 = title.indexOf(': ');
                race = title.substring(0, name_separator_pos1);
                race = '[' + race.substr(0,2) + ']';
                ruler_name = title.substring(name_separator_pos1 + ' city owned by '.length, name_separator_pos2);
                for (j = 0; j < titles_len; j++)
                {
                    if (ruler_name.indexOf(titles_trim[j]) == 0)
                    {
                        ruler_name = ruler_name.slice(titles_trim[j].length);
                        break;
                    }
                }
                if (ruler_name.length > 10)
                {
                    ruler_name_space_pos = ruler_name.indexOf(' ');
                    if (ruler_name_space_pos != -1)
                    {
                        ruler_name = ruler_name.substring(0, ruler_name_space_pos);
                    }
                    if (ruler_name.length > 10)
                    {
                        ruler_name = ruler_name.substring(0, 9);
                    }
                }
                kd_name = title.substring(name_separator_pos2 + ' of '.length, name_separator_pos3); //needs regex in case kd name has ' of ' in it;
                citynames[i].innerHTML = race + city_name;
                ruler_name_style = $(citynames[i]).attr('style');
                $(citynames[i]).before('<span class="citynames" style="' + ruler_name_style + 'cursor: default; color: white; font-weight: bold; text-decoration: none; font-size:0.8em;' + '"><br><br>' + ruler_name +'</span>');
                //add city names to title
                //untagged kds don't have the ' of <kd name>' part, and their name results in race
            }
        }
    }
    
        //menu
        //hidden buttons (display: none);, all with special ids
        // mslot16 - production
        // mslot11-16 - popout
        // magic, waypoint
        // hoh, mslot18-21 - popout
        //click on army/city - popout
        //click on the upper menu buttons - popout
        //click on the hidden menu buttons - popout
    
    //replies when kd button in the menu is blinking
    if (url.indexOf('&replies=') != -1)
    {
        var reply_number = parseInt(url.substring(url.indexOf('&replies=')+'&replies='.length));
        $("table:nth-of-type(1) tr:eq(" + (reply_number+1).toString() + ")").attr('id','reply_post');
        window.location.href = '#reply_post'; //fix it not jumping so the id is at the top of the page, there's a small gap
        //location.hash = '#reply_post'; <--this one just changes the hash (part including and after #)
        
        //http://visual-utopia.com/forum.asp?f=Childrens%20Playground&t=Market%20Sales&replies=36#reply_post <--- includes &t=
    } //posts in thread
    if (url.indexOf('&t=') != -1)
    {
        var breadcrumbs = $('#main > h1:first-child');
        breadcrumbs = breadcrumbs.clone();

        var navigation = $('tr').find('a[href="#top"]');
        navigation = navigation.parent().parent().parent();
        navigation.prev().attr('id','bottom');
        navigation = navigation.clone();
        navigation.find('a[href="#top"]').attr('href','#bottom');
        navigation.find('a[href="#bottom"]').html('Bottom');
        navigation.prependTo("#main > table:first-of-type");
        $("table:nth-of-type(2)").before(breadcrumbs);
        
        if ((url.indexOf('#new') == -1) && (url.indexOf('#bottom') != -1))
        {
            navigation.find('a[href="#bottom"]').get(0).click();
        }
    } //topics in subforum
    else if ((url.indexOf('?f=') != -1) || (url.indexOf('?forum=') != -1))
    {
        var topics = $('#main > table tr:not(:first-child):not(:last-child)');
        var topics_len = topics.length;
        var replies = -1;
        var pages = -1;
        var thread_a = '';
        var thread_url = '';
        var new_posts = -1;
        for (i = 0; i < topics_len; i++)
        {
            replies = parseInt(topics.eq(i).find('td.ljus').eq(0).text())+1;
            pages = Math.ceil(replies/50);
            thread_a = topics.eq(i).find('td.mork a.f.v');
            if (thread_a.attr('href') == undefined)
                thread_a = topics.eq(i).find('td.mork a.f');
            thread_url = thread_a.attr('href');
            new_posts = thread_url.indexOf('#new');

            if (new_posts == -1)
            {
                thread_a.after(thread_a.clone().attr('href', thread_url.substring(0,thread_url.length-1) + pages.toString() + '#bottom'));
                thread_a.next().text(" » ");
            }
            /*else
            {
                new_posts = thread_a.next().trim().text().substr(1);
                new_posts = new_posts.substr(0, new_posts.length-1);
            }*/
        }
    } //subforums in main forum
    else if (url.indexOf('forum.asp') != -1)
    {
        
    }
    //add: navigation to the top and breadcrumbs to the bottom in the subforums
    //add: in threads / subforum, link to the (last) page, and maybe (first) page
    //maybe change: number of thread posts = posts + 1, since currently, the forum doesn't count the first post as a post
    // in threads, add quote button/link on all posts
    //with reply threads, fix it not jumping so the id is at the top of the page, there's a small gap
    //just removing the &page= part from the url always gives teh last page, so remove unnecessary code
    
    //production window
    if (url.indexOf('production.asp') != -1)
    {
        $('#main').css('max-width', '900px').css('*width', '900px'); //568px //.css('width', '900px')
        $('table').get(0).innerHTML = $('table').get(0).innerHTML.replace(/<!--/g, '').replace(/-->/g, '').replace(/\?city=/g, '?cityID=').replace(/<font class="minus">Nothing<\/font>/g, '').replace(/\s*&\s*[0-9]+ wall/g, ''); //.replace(/ & /g, '').replace(/<\/a>\s*([0-9]+) wall\s*/g, '</a> & $1 wall').replace(/wall/g, 'walls').replace(/1 walls/g, '1 wall');
        var row_len = $('table tr').length;
        var col_len = $('table tr th').length;
        
        //http://stackoverflow.com/a/2901298
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        
        //http://stackoverflow.com/a/5464478
        //http://markimarta.com/html-css/change-table-columns-order-via-jquery/
        $.moveColumn = function (table, from_col, to_col, start_row, end_row) {
            var rows = $('tr', table);
            /*if (to_row < 0)
            {
                var row_len = rows.length;
                to_row = row_len + to_row;
            }*/
            var cols;
            if (start_row == end_row)
                end_row++
            for (i = start_row; i < end_row; i++)
            {
                cols = rows.eq(i).children('th, td');
                cols.eq(from_col).detach().insertBefore(cols.eq(to_col));
            }
        }
        $.moveColumn($('table'), 1, 10, 0, row_len-4);
        $.moveColumn($('table'), 1, 10, 0, row_len-4);
        $.moveColumn($('table'), 1, 10, 0, row_len-4);
        $.moveColumn($('table'), 1, 10, 0, row_len-4);
        $('table tr:nth-child(' + (row_len-4+1).toString() + ') td:first-child').remove();
        $('table tr:nth-child(' + (row_len-4+1).toString() + ') td:last-child').remove();
        $('table tr:nth-child(' + (row_len-4+1).toString() + ') td:last-child').before('<td class="light"></td>').before('<td></td>').before('<td class="light"></td>').before('<td></td>').after('<td></td>');
        var tax_total = 0;
        var mine_gold_total = 0;
        for (i = 1; i < row_len-4; i++)
        {
            tax_total = tax_total + parseInt($('table tr:nth-child(' + (i+1).toString() + ') td:nth-child(2)').text().replace('+', '').replace(',', ''));
            mine_gold_total = mine_gold_total + parseInt($('table tr:nth-child(' + (i+1).toString() + ') td:nth-child(3)').text().replace('+', '').replace(',', ''));
        }
        $('table tr:nth-child(' + (row_len-4+1).toString() + ') td:nth-child(2)').removeAttr('colspan');
        $('table tr:nth-child(' + (row_len-4+1).toString() + ') td:nth-child(2)').removeAttr('align').removeClass('light').text('+' + numberWithCommas(tax_total));
        $('table tr:nth-child(' + (row_len-4+1).toString() + ') td:nth-child(2)').after('<td class="light">+' + numberWithCommas(mine_gold_total) + '</td>');
        $('table tr:nth-child(' + (row_len-4+1).toString() + ')').after('<tr><td colspan="2" align="right">Gold Income:</td><td align="right" class="light">+' + numberWithCommas(tax_total + mine_gold_total) + '</td></tr>');
        $('table tr:nth-child(' + (row_len-4+1).toString() + ')').after('<tr><td>&nbsp;</td></tr>');
        
        window.parent.$('#slot0').css('width', '900px').css('max-width', '900px').css('*width', '900px').css('left', '67px');
        window.parent.$('#id_ifrslot0').css('width', '876px').css('max-width', '876px').css('*width', '876px');
    }
    else
    {
        //$('#main').css('max-width', '568px').css('*width', '568px');
        window.parent.$('#slot0').css('width', '628px').css('max-width', '628px').css('*width', '628px').css('left', '203px');
        window.parent.$('#id_ifrslot0').css('width', '604px').css('max-width', '604px').css('*width', '604px');
    }

    if (url.indexOf('build.asp') != -1)
    {
        var productivity_info = $('table:eq(0) tr:eq(1)');
        var total_jobs = parseInt(productivity_info.find('td:eq(1) span').attr('title').replace(/[^0-9]+/g, ''));
        var total_job_buildings = total_jobs/5;
        var productivity_title = productivity_info.find('td:eq(2) span').attr('title');
        var productivity_change = ['down', 'stable', 'up'].indexOf(productivity_title) - 1;
        var total_jobs_missing = 0;
        if (productivity_change == -1)
            total_jobs_missing = parseInt(productivity_title.replace(/[^0-9]+/g, ''));
        
        var buildings_info = $('body script:eq(1)').get(0).innerHTML.replace(/<!--/g, '').replace(/-->/g, '');
        eval(buildings_info); //replace this with some form of window[var_name] = var_value;
        /*
        b0 - Wreckages
        b1 - Homes
        b2 - Farms
        b3 - Mines
        b4 - Magic Towers
        b5 - Guardtowers
        b6 - Taverne
        b7 - Lumbermills
        b8 - Armories
        b9 - Warehouses
        wall - Walls
        maxWall - total walls possible at the moment (it's not the amount of walls you can build, that's = maxWall - wall )
        razeCost - raze gold cost = build gold cost
        baseCost1 = 15.1410706674963; - wtf is dis
        bspace - max left building space in city
        b<1-9>i - building in construction (see the b1-9 above)
        walli - walls in construction
        slaves - slaves working on jobs (not construction)
        aslaves - available slaves (slaves you have globally), same as g_slaves from below
        cityID - city number used for all the popout windows
        cityName - city name...
        */
        var resource_buildings = b2 + b3 + b7;
        var total_buildings = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9;
        var total_buildings_in_construction = b1i + b2i + b3i + b4i + b5i + b6i + b7i + b8i + b9i;
        var total_job_buildings = total_buildings - b1;
        
        var resources_info = $('body script:eq(4)').get(0).innerHTML;
        resources_info = resources_info.replace(/[^0-9&]/g, '');
        resources_info = resources_info.split("&");
        resources_info.pop();
        
        var resources_names = ['g_gold', 'g_food', 'g_stone', 'g_tree', 'g_slaves'];
        $.each(resources_names, function(i) {
            //alert('var ' + resources_names[i] + ' = ' + resources_info[i] + ';');
            window[resources_names[i]] = parseInt(resources_info[i]);
        });
        
        var text_info = $('#infotext').get(0).innerHTML.replace(/[^0-9 ]+/g, '').replace(/[ ]+/g, ' ').trim().split(' ');
        if (text_info.length == 9) //build info with all peasants employed
        {
            text_info.splice(1, 0, '0');
        }
        else if (text_info.length == 10) //build info with some peasants unemployed
        {
            
        }
        else if (text_info.length == 13) //build info with all peasants employed + building a building without slaves
        {
            text_info.splice(0, 4);
            text_info.splice(1, 0, '0');
        }
        else if (text_info.length == 14) //build info with some peasants unemployed + building a building without slaves
        {
            text_info.splice(0, 4);
        }
        else if (text_info.length == 15) //build info with all peasants employed + building with slaves
        {
            text_info.splice(0, 6);
            text_info.splice(1, 0, '0');
        }
        else if (text_info.length == 16) //build info with some peasants unemployed + building with slaves
        {
            text_info.splice(0, 6);
        }
        else
        {
            alert('build window number mismatch, data array length (is not 10): ' + (text_info.length).toString() + ' array: ' + text_info.join(', '));
        }

        var info_names = ['c_peasants', 'c_peasants_unemployed', 'c_build_space_left', 'c_num_buildable', 'c_num_buildable_walls', 'c_build_cost_gold', 'c_build_cost_tree', 'c_build_cost_stone', 'c_build_cost_stone_wall', 'c_build_time'];
        $.each(info_names, function(i) {
            //alert('var ' + info_names[i] + ' = ' + text_info[i] + ';');
            window[info_names[i]] = parseInt(text_info[i]);
        });
        
        //var c_slave_build_time = Math.floor(c_build_time/2);
        
        if (total_jobs_missing == 0)
        {
            //situation where slaves keep up the productivity, but peasants are needed to fill jobs; can be rising, falling or stable productivity; 
            //OR
            //got more or equal number of peasants compared to jobs, so it's really == 0
        }
        
        var total_job_buildings_missing = total_jobs_missing/5;
        
        var max_buildings_capacity = total_buildings + c_build_space_left;
        
        var slaves_building = 0;
        var slaves_working = 0;
        //formula for max buildings buildable ==> (c_num_buildable+total_buildings_in_construction)/total_buildings ~= 2.04
     
        

        /*if (c_build_space_left > c_num_buildable)
        {
            if (((c_num_buildable+1)*c_build_cost_gold < g_gold) && ((c_num_buildable+1)*c_build_cost_tree < g_tree) && ((c_num_buildable+1)*c_build_cost_stone < g_stone))
            {
                //alert('Got enough resources to build all.\nBuildable: ' + c_num_buildable.toString() + ', Total Buildings: ' + total_buildings.toString() + ', Total Capacity: ' + max_buildings_capacity.toString() + '\n' + (Math.round(parseFloat(100*(c_num_buildable+total_buildings_in_construction)/total_buildings) * 100) / 100).toString() + '% buildable/buildings.\n  ' + (Math.round(parseFloat(100*c_num_buildable/max_buildings_capacity) * 100) / 100).toString() + '% buildable/max_capacity.');
            }
            else
            {
                //alert('Not enough resources to build all.\nBuildable: ' + c_num_buildable.toString() + ', Total Buildings: ' + total_buildings.toString() + ', Total Capacity: ' + max_buildings_capacity.toString() + '\n' + (Math.round(parseFloat(100*(c_num_buildable+total_buildings_in_construction)/total_buildings) * 100) / 100).toString() + '% buildable/buildings.\n' + (Math.round(parseFloat(100*c_num_buildable/max_buildings_capacity) * 100) / 100).toString() + '% buildable/max_capacity.');
            }
        }
        else
        {
            //alert('Can build all.\nBuildable: ' + c_num_buildable.toString() + ', Total Buildings: ' + total_buildings.toString() + ', Total Capacity: ' + max_buildings_capacity.toString() + '\n' + (Math.round(parseFloat(100*(c_num_buildable+total_buildings_in_construction)/total_buildings) * 100) / 100).toString() + '% buildable/buildings.\n' + (Math.round(parseFloat(100*c_num_buildable/max_buildings_capacity) * 100) / 100).toString() + '% buildable/max_capacity.');
        }*/
        

        
        //building tree/stone cost = gold cost/4 = wall stone cost/8
        //1 slave works as 1 peasant, but doesn't pay taxes and doesn't spend food
        //1 peasant pays 1 gold in taxes, it increases in bigger cities, he also eats 0.25 food
        //it takes 10 slaves to speed up the building of 1 building, so the formula is by floor((slaves/10)*build_time/2), I think.
        
        // fix defense: 4,198 men + 3 armies. --> remove trailing dot .
        // 81647 vs 83104,744525547445255474452554745 *2.74; from my biggest army, the coefficient is 2,7889258555133079847908745247148, gives correct total army upkeep (not sure if single units are rounded)
        
        
    }
        
});
    //<div title="Halfling city owned by Mr. Ruthless The Tall of Childrens Playground: 27539 buildings." onclick="pop('cityInfoE.asp?cityID=493328')" style="position: absolute; top:3848; left: 3524;" class="citynames">The PalaceHalfling city owned by Mr. Ruthless The Tall of Childrens Playground: 27539 buildings.</div>


//turn on land size, productivity, employement, morale and maybe defense in production
//hide/remove some waypoints (from kd page list and from map)
//add extra X or some other sign like for armies of the last size, or two rows, one with 3X and the other with 2X
//in production window, separate total tax and total gold from mines, then show them combined under it
//wut, opens when you click on the KD button: http://visual-utopia.com/forum.asp?f=Childrens%20Playground&t=Battle%20Reports&replies=42
//when you reply it scrolls to the top of the page... make it scroll to the bottom
// in production window, calculate the max amount of walls, and use the current amount to show %walls (or %increased prep time)
// in production window, add col for training, new army, and add links to defense in the empty defense cells
// fix right borders in production window
// split tax and mine gold income
// in production window, from Prod.	Pop.	Empl. and land, calculate the approx number of jobs and home and workers (pezzie+slave) and other buildings
// in production window, rename Total Income to Net Income and Gold Income to Total Income
// in production window, move land col to the first place after city names, remove light color from it, recolor the rest of the table with alternate colors, make the 4 tds of the gold total rows at the bot have colspan="2"
// in market, remember the resource tab open when switching between buy/sell
// market - add max buy/sell price when it's empty; also add native prices for each when empty; try to figure out native prices when not empty
// market - allow entering an amount and then the multiplier(floored) for easier selling
// market - allow using size suffixes: 10M or 10m = 1000000, 100k
// market - add automatic , adding on numbers
// market - allow inserting , and . as thousands separators
// in training window, add max button, and costs next to input boxes
// in kingdom window, maybe make the forum link open the forum inside the window, not in a new tab; same when the kd button is flashing in the menu


//SOLVED: forum rul replies: check if reply_number is mod50, so indicates the last page, or can be on previous pages as well; since &replies= doesn't redirect to other pages, I guess it's so


//https://static.visual-utopia.com/menu.js
//https://static.visual-utopia.com/pop.js
//https://static.visual-utopia.com/pngfix.js
//https://static.visual-utopia.com/build.js
//https://static.visual-utopia.com/style.css?v=3
