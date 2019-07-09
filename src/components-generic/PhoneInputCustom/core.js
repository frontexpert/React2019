/* eslint-disable */
const inputFormatPhoneInit = (init_country, init_phone_number, handle_input) => {
    let Prefixes = [['1876', 'JM', 'Jamaica', 'XXX XXXX'], ['1869', 'KN', 'Saint Kitts & Nevis', 'XXX XXXX'], ['1868', 'TT', 'Trinidad & Tobago', 'XXX XXXX'], ['1784', 'VC', 'Saint Vincent & the Grenadines', 'XXX XXXX'], ['1767', 'DM', 'Dominica', 'XXX XXXX'], ['1758', 'LC', 'Saint Lucia', 'XXX XXXX'], ['1721', 'SX', 'Sint Maarten', 'XXX XXXX'], ['1684', 'AS', 'American Samoa', 'XXX XXXX'], ['1671', 'GU', 'Guam', 'XXX XXXX'], ['1670', 'MP', 'Northern Mariana Islands', 'XXX XXXX'], ['1664', 'MS', 'Montserrat', 'XXX XXXX'], ['1649', 'TC', 'Turks & Caicos Islands', 'XXX XXXX'], ['1473', 'GD', 'Grenada', 'XXX XXXX'], ['1441', 'BM', 'Bermuda', 'XXX XXXX'], ['1345', 'KY', 'Cayman Islands', 'XXX XXXX'], ['1340', 'VI', 'US Virgin Islands', 'XXX XXXX'], ['1284', 'VG', 'British Virgin Islands', 'XXX XXXX'], ['1268', 'AG', 'Antigua & Barbuda', 'XXX XXXX'], ['1264', 'AI', 'Anguilla', 'XXX XXXX'], ['1246', 'BB', 'Barbados', 'XXX XXXX'], ['1242', 'BS', 'Bahamas', 'XXX XXXX'], ['998', 'UZ', 'Uzbekistan', 'XX XXXXXXX'], ['996', 'KG', 'Kyrgyzstan'], ['995', 'GE', 'Georgia'], ['994', 'AZ', 'Azerbaijan', 'XX XXX XX XX'], ['993', 'TM', 'Turkmenistan', 'XX XXXXXX'], ['992', 'TJ', 'Tajikistan'], ['977', 'NP', 'Nepal'], ['976', 'MN', 'Mongolia'], ['975', 'BT', 'Bhutan'], ['974', 'QA', 'Qatar'], ['973', 'BH', 'Bahrain', 'XXXX XXXX'], ['972', 'IL', 'Israel', 'XX XXX XXXX'], ['971', 'AE', 'United Arab Emirates', 'XX XXX XXXX'], ['970', 'PS', 'Palestine', 'XXX XX XXXX'], ['968', 'OM', 'Oman', 'XXXX XXXX'], ['967', 'YE', 'Yemen', 'XXX XXX XXX'], ['966', 'SA', 'Saudi Arabia'], ['965', 'KW', 'Kuwait', 'XXXX XXXX'], ['964', 'IQ', 'Iraq', 'XXX XXX XXXX'], ['963', 'SY', 'Syria'], ['962', 'JO', 'Jordan', 'X XXXX XXXX'], ['961', 'LB', 'Lebanon'], ['960', 'MV', 'Maldives'], ['886', 'TW', 'Taiwan'], ['880', 'BD', 'Bangladesh'], ['856', 'LA', 'Laos'], ['855', 'KH', 'Cambodia'], ['853', 'MO', 'Macau'], ['852', 'HK', 'Hong Kong'], ['850', 'KP', 'North Korea'], ['692', 'MH', 'Marshall Islands'], ['691', 'FM', 'Micronesia'], ['690', 'TK', 'Tokelau'], ['689', 'PF', 'French Polynesia'], ['688', 'TV', 'Tuvalu'], ['687', 'NC', 'New Caledonia'], ['686', 'KI', 'Kiribati'], ['685', 'WS', 'Samoa'], ['683', 'NU', 'Niue'], ['682', 'CK', 'Cook Islands'], ['681', 'WF', 'Wallis & Futuna'], ['680', 'PW', 'Palau'], ['679', 'FJ', 'Fiji'], ['678', 'VU', 'Vanuatu'], ['677', 'SB', 'Solomon Islands'], ['676', 'TO', 'Tonga'], ['675', 'PG', 'Papua New Guinea'], ['674', 'NR', 'Nauru'], ['673', 'BN', 'Brunei Darussalam', 'XXX XXXX'], ['672', 'NF', 'Norfolk Island'], ['670', 'TL', 'Timor-Leste'], ['599', 'BQ', 'Bonaire, Sint Eustatius & Saba'], ['599', 'CW', 'Curaçao'], ['598', 'UY', 'Uruguay', 'XXXX XXXX'], ['597', 'SR', 'Suriname', 'XXX XXXX'], ['596', 'MQ', 'Martinique'], ['595', 'PY', 'Paraguay', 'XXX XXX XXX'], ['594', 'GF', 'French Guiana'], ['593', 'EC', 'Ecuador'], ['592', 'GY', 'Guyana'], ['591', 'BO', 'Bolivia', 'X XXX XXXX'], ['590', 'GP', 'Guadeloupe'], ['509', 'HT', 'Haiti'], ['508', 'PM', 'Saint Pierre & Miquelon'], ['507', 'PA', 'Panama', 'XXXX XXXX'], ['506', 'CR', 'Costa Rica'], ['505', 'NI', 'Nicaragua', 'XXXX XXXX'], ['504', 'HN', 'Honduras', 'XXXX XXXX'], ['503', 'SV', 'El Salvador', 'XXXX XXXX'], ['502', 'GT', 'Guatemala', 'X XXX XXXX'], ['501', 'BZ', 'Belize'], ['500', 'FK', 'Falkland Islands'], ['423', 'LI', 'Liechtenstein'], ['421', 'SK', 'Slovakia'], ['420', 'CZ', 'Czech Republic'], ['389', 'MK', 'Macedonia'], ['387', 'BA', 'Bosnia & Herzegovina'], ['386', 'SI', 'Slovenia'], ['385', 'HR', 'Croatia'], ['382', 'ME', 'Montenegro'], ['381', 'RS', 'Serbia', 'XX XXX XXXX'], ['380', 'UA', 'Ukraine', 'XX XXX XX XX'], ['378', 'SM', 'San Marino', 'XXX XXX XXXX'], ['377', 'MC', 'Monaco', 'XXXX XXXX'], ['376', 'AD', 'Andorra', 'XX XX XX'], ['375', 'BY', 'Belarus', 'XX XXX XXXX'], ['374', 'AM', 'Armenia', 'XX XXX XXX'], ['373', 'MD', 'Moldova', 'XX XXX XXX'], ['372', 'EE', 'Estonia'], ['371', 'LV', 'Latvia', 'XXX XXXXX'], ['370', 'LT', 'Lithuania', 'XXX XXXXX'], ['359', 'BG', 'Bulgaria'], ['358', 'FI', 'Finland'], ['357', 'CY', 'Cyprus', 'XXXX XXXX'], ['356', 'MT', 'Malta', 'XX XX XX XX'], ['355', 'AL', 'Albania', 'XX XXX XXXX'], ['354', 'IS', 'Iceland', 'XXX XXXX'], ['353', 'IE', 'Ireland', 'XX XXX XXXX'], ['352', 'LU', 'Luxembourg'], ['351', 'PT', 'Portugal', 'X XXXX XXXX'], ['350', 'GI', 'Gibraltar', 'XXXX XXXX'], ['299', 'GL', 'Greenland', 'XXX XXX'], ['298', 'FO', 'Faroe Islands', 'XXX XXX'], ['297', 'AW', 'Aruba', 'XXX XXXX'], ['291', 'ER', 'Eritrea', 'X XXX XXX'], ['290', 'SH', 'Saint Helena', 'XX XXX'], ['269', 'KM', 'Comoros', 'XXX XXXX'], ['268', 'SZ', 'Swaziland', 'XXXX XXXX'], ['267', 'BW', 'Botswana', 'XX XXX XXX'], ['266', 'LS', 'Lesotho', 'XX XXX XXX'], ['265', 'MW', 'Malawi'], ['264', 'NA', 'Namibia', 'XX XXX XXXX'], ['263', 'ZW', 'Zimbabwe', 'XX XXX XXXX'], ['262', 'RE', 'Réunion', 'XXX XXX XXX'], ['261', 'MG', 'Madagascar', 'XX XX XXX XX'], ['260', 'ZM', 'Zambia', 'XX XXX XXXX'], ['258', 'MZ', 'Mozambique', 'XX XXX XXXX'], ['257', 'BI', 'Burundi', 'XX XX XXXX'], ['256', 'UG', 'Uganda', 'XX XXX XXXX'], ['255', 'TZ', 'Tanzania', 'XX XXX XXXX'], ['254', 'KE', 'Kenya', 'XXX XXX XXX'], ['253', 'DJ', 'Djibouti', 'XX XX XX XX'], ['252', 'SO', 'Somalia', 'XX XXX XXX'], ['251', 'ET', 'Ethiopia', 'XX XXX XXXX'], ['250', 'RW', 'Rwanda', 'XXX XXX XXX'], ['249', 'SD', 'Sudan', 'XX XXX XXXX'], ['248', 'SC', 'Seychelles', 'X XX XX XX'], ['247', 'SH', 'Saint Helena', 'XXXX'], ['246', 'IO', 'Diego Garcia', 'XXX XXXX'], ['245', 'GW', 'Guinea-Bissau', 'XXX XXXX'], ['244', 'AO', 'Angola', 'XXX XXX XXX'], ['243', 'CD', 'Congo (Dem. Rep.)', 'XX XXX XXXX'], ['242', 'CG', 'Congo (Rep.)', 'XX XXX XXXX'], ['241', 'GA', 'Gabon', 'X XX XX XX'], ['240', 'GQ', 'Equatorial Guinea', 'XXX XXX XXX'], ['239', 'ST', 'São Tomé & Príncipe', 'XX XXXXX'], ['238', 'CV', 'Cape Verde', 'XXX XXXX'], ['237', 'CM', 'Cameroon', 'XXXX XXXX'], ['236', 'CF', 'Central African Rep.', 'XX XX XX XX'], ['235', 'TD', 'Chad', 'XX XX XX XX'], ['234', 'NG', 'Nigeria'], ['233', 'GH', 'Ghana'], ['232', 'SL', 'Sierra Leone', 'XX XXX XXX'], ['231', 'LR', 'Liberia'], ['230', 'MU', 'Mauritius'], ['229', 'BJ', 'Benin', 'XX XXX XXX'], ['228', 'TG', 'Togo', 'XX XXX XXX'], ['227', 'NE', 'Niger', 'XX XX XX XX'], ['226', 'BF', 'Burkina Faso', 'XX XX XX XX'], ['225', 'CI', 'Côte d`Ivoire', 'XX XXX XXX'], ['224', 'GN', 'Guinea', 'XXX XXX XXX'], ['223', 'ML', 'Mali', 'XXXX XXXX'], ['222', 'MR', 'Mauritania', 'XXXX XXXX'], ['221', 'SN', 'Senegal', 'XX XXX XXXX'], ['220', 'GM', 'Gambia', 'XXX XXXX'], ['218', 'LY', 'Libya', 'XX XXX XXXX'], ['216', 'TN', 'Tunisia', 'XX XXX XXX'], ['213', 'DZ', 'Algeria', 'XXX XX XX XX'], ['212', 'MA', 'Morocco', 'XX XXX XXXX'], ['211', 'SS', 'South Sudan', 'XX XXX XXXX'], ['98', 'IR', 'Iran', 'XXX XXX XXXX'], ['95', 'MM', 'Myanmar'], ['94', 'LK', 'Sri Lanka', 'XX XXX XXXX'], ['93', 'AF', 'Afghanistan', 'XXX XXX XXX'], ['92', 'PK', 'Pakistan', 'XXX XXX XXXX'], ['91', 'IN', 'India', 'XXXXX XXXXX'], ['90', 'TR', 'Turkey', 'XXX XXX XXXX'], ['86', 'CN', 'China', 'XXX XXXX XXXX'], ['84', 'VN', 'Vietnam'], ['82', 'KR', 'South Korea'], ['81', 'JP', 'Japan', 'XX XXXX XXXX'], ['66', 'TH', 'Thailand', 'X XXXX XXXX'], ['65', 'SG', 'Singapore', 'XXXX XXXX'], ['64', 'NZ', 'New Zealand'], ['63', 'PH', 'Philippines', 'XXX XXX XXXX'], ['62', 'ID', 'Indonesia'], ['61', 'AU', 'Australia', 'XXX XXX XXX'], ['60', 'MY', 'Malaysia'], ['58', 'VE', 'Venezuela', 'XXX XXX XXXX'], ['57', 'CO', 'Colombia', 'XXX XXX XXXX'], ['56', 'CL', 'Chile', 'X XXXX XXXX'], ['55', 'BR', 'Brazil', 'XX XXXXX XXXX'], ['54', 'AR', 'Argentina'], ['53', 'CU', 'Cuba', 'XXXX XXXX'], ['52', 'MX', 'Mexico'], ['51', 'PE', 'Peru', 'XXX XXX XXX'], ['49', 'DE', 'Germany', 'XXX XXXXXXXX'], ['48', 'PL', 'Poland', 'XX XXX XXXX'], ['47', 'NO', 'Norway', 'XXXX XXXX'], ['46', 'SE', 'Sweden', 'XX XXX XXXX'], ['45', 'DK', 'Denmark', 'XXXX XXXX'], ['44', 'GB', 'United Kingdom', 'XXXX XXXXXX'], ['43', 'AT', 'Austria'], ['41', 'CH', 'Switzerland', 'XX XXX XXXX'], ['40', 'RO', 'Romania', 'XXX XXX XXX'], ['39', 'IT', 'Italy', 'XXX XXX XXXX'], ['36', 'HU', 'Hungary', 'XX XXX XXXX'], ['34', 'ES', 'Spain', 'XXX XXX XXX'], ['33', 'FR', 'France', 'X XX XX XX XX'], ['32', 'BE', 'Belgium', 'XXX XX XX XX'], ['31', 'NL', 'Netherlands', 'X XX XX XX XX'], ['30', 'GR', 'Greece', 'XX XXXX XXXX'], ['27', 'ZA', 'South Africa', 'XX XXX XXXX'], ['20', 'EG', 'Egypt', 'XX XXX XXXX'], ['7', 'RU', 'Russian Federation', 'XXX XXX XX XX'], ['7', 'KZ', 'Kazakhstan', 'XXX XXX XX XX'], ['1', 'US', 'USA', 'XXX XXX XXXX'], ['1', 'PR', 'Puerto Rico', 'XXX XXX XXXX'], ['1', 'DO', 'Dominican Rep.', 'XXX XXX XXXX'], ['1', 'CA', 'Canada', 'XXX XXX XXXX'], ['383', 'XK', 'Kosovo', 'XXX XXXX XXXX']];
    let SortedPrefixes = Prefixes.concat([]);

    SortedPrefixes.sort(function (a, b) {
        let an = a[2].toLowerCase(), bn = b[2].toLowerCase();
        return an < bn ? -1 : (an > bn ? 1 : 0);
    });

    let Keys = {
        BACKSPACE: 8,
        TAB: 9,
        RETURN: 13,
        ESC: 27,
        LEFT: 37,
        RIGHT: 39,
        UP: 38,
        DOWN: 40
    };

    const code_el = document.getElementById('login-phone-code'),
        phone_el = document.getElementById('login-phone'),
        placeholder_el = document.getElementById('login-phone-placeholder'),
        country_wrap_el = document.getElementById('login-country-wrap'),
        country_label_el = document.getElementById('login-country-selected'),
        country_search_el = document.getElementById('login-country-search'),
        search_results_el = document.getElementById('login-country-search-results');

    function escapeHTML (html) {
        html = html || '';
        return html.replace(/&/g, '&amp;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    function cdata (data) {
        return {
            prefix: data[0],
            code: data[1],
            name: data[2],
            format: data[3] || ''
        };
    }

    function getCountryDataByPrefix (value) {
        for (let i = 0; i < Prefixes.length; i++) {
            let data = cdata(Prefixes[i]);
            if (value.indexOf(data.prefix) === 0) {
                return data;
            }
        }
        return false;
    }

    function getCountryDataByCountryCode (country_code) {
        for (let i = 0; i < Prefixes.length; i++) {
            let data = cdata(Prefixes[i]);
            if (country_code === data.code) {
                return data;
            }
        }
        return false;
    }

    function upCountryByCountryCode (country_code) {
        for (let i = 0; i < Prefixes.length; i++) {
            let data = cdata(Prefixes[i]);
            if (country_code === data.code) {
                let adata = Prefixes[i];
                Prefixes.splice(i, 1);
                Prefixes.unshift(adata);
                return data;
            }
        }
        return false;
    }

    function mayBePrefix (value) {
        for (let i = 0; i < Prefixes.length; i++) {
            let prefix = Prefixes[i][0];
            if (prefix.indexOf(value) === 0) {
                return true;
            }
        }
        return false;
    }

    function onKeyDown (e) {
        if (e.target === phone_el &&
            (e.keyCode === Keys.LEFT ||
                e.keyCode === Keys.BACKSPACE) &&
            phone_el.selectionStart === phone_el.selectionEnd &&
            phone_el.selectionStart === 0) {
            code_el.focus();
            code_el.setSelectionRange(code_el.value.length, code_el.value.length);
        } else if (e.target === code_el &&
            e.keyCode === Keys.RIGHT &&
            code_el.selectionStart === code_el.selectionEnd &&
            code_el.selectionStart === code_el.value.length) {
            phone_el.focus();
            phone_el.setSelectionRange(0, 0);
        }
        setTimeout(onInput, 0, e);
    }

    function onInput (e) {
        if (e && (e.keyCode < 48 || e.keyCode > 57)) {
            return false;
        }

        let code = code_el.value;
        let number = phone_el.value;
        let value = (code + number).substr(0, 24);
        let selectionStart;

        if (document.activeElement === code_el) {
            selectionStart = code_el.selectionStart;
        } else {
            selectionStart = code_el.value.length + phone_el.selectionStart;
        }

        let prefix = value.substr(0, selectionStart);
        value = value.replace(/[^0-9]/g, '');
        prefix = prefix.replace(/[^0-9]/g, '');

        let prefix_len = prefix.length;
        let found_data = getCountryDataByPrefix(value);
        let newSelectionStart = 1 + prefix_len;
        let isPrefixFull = false;
        let pk = 0;
        let new_code, new_value, new_placeholder;

        if (found_data) {
            isPrefixFull = true;
            let fdPrefix = found_data.prefix;
            let fdFormat = found_data.format;
            let suffix = value.substr(fdPrefix.length);

            new_code = '+' + fdPrefix;
            new_value = '';
            new_placeholder = new_value;
            pk += fdPrefix.length;

            let k = 0;
            for (let j = 0; j < fdFormat.length; j++) {
                if (fdFormat[j] === 'X') {
                    new_value += suffix[k] || '';
                    new_placeholder += suffix[k] || '_';
                    k++;
                    pk++;
                } else {
                    new_value += (k < suffix.length) ? fdFormat[j] : '';
                    new_placeholder += fdFormat[j];
                    if (pk < prefix_len) newSelectionStart++;
                }
            }

            if (k < suffix.length) {
                new_value += suffix.substr(k);
            }

            country_label_el.innerHTML = found_data.name;
            country_label_el.classList.add('is-dirty');
        } else {
            new_code = '+';
            new_value = '';

            if (mayBePrefix(value)) {
                new_code += value;
            } else {
                isPrefixFull = true;
                new_value += value;
            }

            new_placeholder = new_value;
            country_label_el.innerHTML = country_label_el.getAttribute('data-placeholder');
            country_label_el.classList.remove('is-dirty');
        }

        if (!new_placeholder.length && !new_value.length) {
            new_placeholder = placeholder_el.getAttribute('data-placeholder') || '';
        }

        placeholder_el.innerHTML = new_placeholder;
        code_el.value = new_code;
        phone_el.value = new_value;

        let focused_el;
        if (newSelectionStart > new_code.length ||
            isPrefixFull && newSelectionStart === new_code.length) {
            newSelectionStart -= new_code.length;
            focused_el = phone_el;
        } else {
            focused_el = code_el;
        }

        focused_el.focus();
        // focused_el.setSelectionRange(newSelectionStart, newSelectionStart);
        // setTimeout(function () {
        //     focused_el.setSelectionRange(newSelectionStart, newSelectionStart);
        // }, 0);
        code_el.parentNode.classList.remove('is-invalid');
        phone_el.parentNode.classList.remove('is-invalid');

        if (handle_input) {
            handle_input(
                new_code,
                new_value,
                found_data && found_data.code ? found_data.code : '',
                found_data && found_data.name ? found_data.name : '',
            );
        }
    }

    function adjustScroll (el) {
        let scrollTop = search_results_el.scrollTop,
            itemTop = el.offsetTop,
            itemBottom = itemTop + el.offsetHeight,
            contHeight = search_results_el.offsetHeight;

        if (itemTop < scrollTop) {
            search_results_el.scrollTop = itemTop;
        } else if (itemBottom > scrollTop + contHeight) {
            search_results_el.scrollTop = itemBottom - contHeight;
        }
    }

    function onSearchDocumentKeyDown (e) {
        if (e.keyCode === Keys.ESC) {
            e.preventDefault();
            searchClose();
        } else if (e.keyCode === Keys.UP) {
            e.preventDefault();
            if (searchSelectedEl && searchSelectedEl.previousSibling) {
                searchItemOver(searchSelectedEl.previousSibling, true);
            }
        } else if (e.keyCode === Keys.DOWN) {
            e.preventDefault();
            if (searchSelectedEl && searchSelectedEl.nextSibling) {
                searchItemOver(searchSelectedEl.nextSibling, true);
            }
        } else if (e.keyCode === Keys.TAB) {
            e.preventDefault();
            searchClose();
        } else if (e.keyCode === Keys.RETURN) {
            e.preventDefault();
            searchItemSelect(searchSelectedEl);
        }
    }

    function onClickOutside (e) {
        searchClose();
    }

    function onSearchClick (e) {
        e.stopPropagation();
    }

    function onSearchKeyDown (e) {
        setTimeout(onSearchInput, 0, e);
    }

    function onSearchInput (e) {
        if (searchLastValue !== country_search_el.value) {
            searchLastValue = country_search_el.value;
            updateSearchResults(country_search_el.value);
        }
    }

    let searchSelectedEl, searchLastValue;

    function updateSearchResults (query) {
        query = (query || '').toLowerCase();

        let html = '';
        let found = false;

        for (let i = 0; i < SortedPrefixes.length; i++) {
            let data = cdata(SortedPrefixes[i]);
            if (!query ||
                !data.name.toLowerCase().indexOf(query) ||
                !data.prefix.indexOf(query) ||
                query[0] === '+' && !data.prefix.indexOf(query.substr(1))) {
                found = true;
                html += '<div class="login_country_search_result" data-code="' + escapeHTML(data.code) + '">' + escapeHTML(data.name) + '<span class="prefix">+' + escapeHTML(data.prefix) + '</span></div>';
            }
        }

        if (!found) {
            let noResult = search_results_el.getAttribute('data-noresult');
            html = '<div class="login_country_search_noresult">' + escapeHTML(noResult) + '</div>';
        }
        search_results_el.innerHTML = html;
        searchItemOver(found ? search_results_el.children[0] : null, true);
    }

    function onSearchItemOver (e) {
        let el = e.target;
        while (el && el.classList) {
            if (el.classList.contains('login_country_search_result')) {
                searchItemOver(el);
                return;
            }
            el = el.parentNode;
        }
    }

    function onSearchItemClick (e) {
        e.stopPropagation();

        let el = e.target;
        while (el && el.classList) {
            if (el.classList.contains('login_country_search_result')) {
                searchItemSelect(el);
                return;
            }
            el = el.parentNode;
        }
    }

    function searchItemOver (el, adjust) {
        if (searchSelectedEl) {
            searchSelectedEl.classList.remove('selected');
        }
        if (el) {
            searchSelectedEl = el;
            // el.classList.add('selected');
            adjust && adjustScroll(el);
        } else {
            searchSelectedEl = null;
        }
    }

    function searchItemSelect (el) {
        if (!el) {
            searchClose();
            return;
        }

        el.classList.add('selected');

        let country_code = el.getAttribute('data-code');
        let data = upCountryByCountryCode(country_code);
        if (data) {
            code_el.value = data.prefix;
        }
        searchClose();
    }

    function onSearchOpen (e) {
        e.stopPropagation();
        country_wrap_el.classList.add('opened');
        country_search_el.value = searchLastValue = '';
        setTimeout(function () { country_search_el.focus(); }, 100);
        updateSearchResults();
        document.addEventListener('keydown', onSearchDocumentKeyDown);
        document.addEventListener('click', onClickOutside);
    }

    function searchClose () {
        country_wrap_el.classList.remove('opened');
        document.removeEventListener('keydown', onSearchDocumentKeyDown);
        document.removeEventListener('click', onClickOutside);
        phone_el.setSelectionRange(phone_el.value.length, phone_el.value.length);
        onInput();
    }

    code_el.addEventListener('input', onInput);
    code_el.addEventListener('keydown', onKeyDown);
    phone_el.addEventListener('input', onInput);
    phone_el.addEventListener('keydown', onKeyDown);

    country_label_el.addEventListener('click', onSearchOpen);
    country_search_el.addEventListener('click', onSearchClick);
    country_search_el.addEventListener('input', onSearchInput);
    country_search_el.addEventListener('keydown', onSearchKeyDown);
    search_results_el.addEventListener('mouseover', onSearchItemOver);
    search_results_el.addEventListener('click', onSearchItemClick);

    let init_prefix = '+';
    if (init_phone_number) {
        init_prefix += init_phone_number;
    } else if (init_country) {
        let data = getCountryDataByCountryCode(init_country);
        if (data) {
            init_prefix += data.prefix;
        }
    }
    code_el.value = init_prefix;
    phone_el.focus();
    onInput();
};

export default inputFormatPhoneInit;
