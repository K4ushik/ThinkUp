/**
 *
 * ThinkUp/webapp/assets/js/word_frequency.js
 *
 * Copyright (c) 2009-2010 Mark Wilkie
 *
 * LICENSE:
 *
 * This file is part of ThinkUp (http://thinkupapp.com).
 *
 * ThinkUp is free software: you can redistribute it and/or modify it under the terms of the GNU General Public
 * License as published by the Free Software Foundation, either version 2 of the License, or (at your option) any
 * later version.
 *
 * ThinkUp is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with ThinkUp.  If not, see
 * <http://www.gnu.org/licenses/>.
 *
 *
 * @author Mark Wilkie <mwilkie[at]gmail[dot]com>
 * @license http://www.gnu.org/licenses/gpl.html
 * @copyright 2009-2010 Mark Wilkie
 */

var TUWordFrequency = function() {
    /* our word temnplates... */
    this.word_template = '<div class="word-frequency-word" id="${id}"><span class="word-frequency-count">' +
        '${count}</span>&nbsp;${word}</div>';
    this.post_template = '<div style="padding: 10px;">${post} - <a href="http://twitter.com/${author}">${author}</a>';

    /* our stop words... */
    this.stop_words = new Array('i', 'a', '-', "a's", "able", "about", "above", "according", "accordingly", "across", 
            "actually", "after", "afterwards", "again", "against", "ain't", "all", "allow", "allows", "almost", 
            "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "an", "and", 
            "another", "any", "anybody", "anyhow", "anyone", "anything", "anyway", "anyways", "anywhere", "apart", 
            "appear", "appreciate", "appropriate", "are", "aren't", "around", "as", "aside", "ask", "asking", 
            "associated", "at", "available", "away", "awfully", "be", "became", "because", "become", "becomes", 
            "becoming", "been", "before", "beforehand", "behind", "being", "believe", "below", "beside", "besides", 
            "best", "better", "between", "beyond", "both", "brief", "but", "by", "c'mon", "c's", "came", "can", "can't", 
            "cannot", "cant", "cause", "causes", "certain", "certainly", "changes", "clearly", "co", "com", "come", 
            "comes", "concerning", "consequently", "consider", "considering", "contain", "containing", "contains", 
            "corresponding", "could", "couldn't", "course", "currently", "definitely", "described", "despite", "did",
            "didn't", "different", "do", "does", "doesn't", "doing", "don't", "done", "down", "downwards", "during", 
            "each", "edu", "eg", "eight", "either", "else", "elsewhere", "enough", "entirely", "especially", "et", 
            "etc", "even", "ever", "every", "everybody", "everyone", "everything", "everywhere", "ex", "exactly", 
            "example", "except", "far", "few", "fifth", "first", "five", "followed", "following", "follows", "for", 
            "former", "formerly", "forth", "four", "from", "further", "furthermore", "get", "gets", "getting", 
            "given", "gives", "go", "goes", "going", "gone", "got", "gotten", "greetings", "had", "hadn't", 
            "happens", "hardly", "has", "hasn't", "have", "haven't", "having", "he", "he's", "hello", "help", 
            "hence", "her", "here", "here's", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "hi", 
            "him", "himself", "his", "hither", "hopefully", "how", "howbeit", "however", "i'd", "i'll", "i'm", 
            "i've", "ie", "if", "ignored", "immediate", "in", "inasmuch", "inc", "indeed", "indicate", "indicated", 
            "indicates", "inner", "insofar", "instead", "into", "inward", "is", "isn't", "it", "it'd", "it'll", 
            "it's", "its", "itself", "just", "keep", "keeps", "kept", "know", "knows", "known", "last", "lately", 
            "later", "latter", "latterly", "least", "less", "lest", "let", "let's", "like", "liked", "likely", 
            "little", "look", "looking", "looks", "ltd", "mainly", "many", "may", "maybe", "me", "mean", "meanwhile", 
            "merely", "might", "more", "moreover", "most", "mostly", "much", "must", "my", "myself", "name", "namely",
            "nd", "near", "nearly", "necessary", "need", "needs", "neither", "never", "nevertheless", "new", "next", 
            "nine", "no", "nobody", "non", "none", "noone", "nor", "normally", "not", "nothing", "novel", "now", 
            "nowhere", "obviously", "of", "off", "often", "oh", "ok", "okay", "old", "on", "once", "one", "ones", 
            "only", "onto", "or", "other", "others", "otherwise", "ought", "our", "ours", "ourselves", "out", 
            "outside", "over", "overall", "own", "particular", "particularly", "per", "perhaps", "placed", "please", 
            "plus", "possible", "presumably", "probably", "provides", "que", "quite", "qv", "rather", "rd", "re", 
            "really", "reasonably", "regarding", "regardless", "regards", "relatively", "respectively", "right", 
            "said", "same", "saw", "say", "saying", "says", "second", "secondly", "see", "seeing", "seem", "seemed", 
            "seeming", "seems", "seen", "self", "selves", "sensible", "sent", "serious", "seriously", "seven", 
            "several", "shall", "she", "should", "shouldn't", "since", "six", "so", "some", "somebody", 
            "somehow", "someone", "something", "sometime", "sometimes", "somewhat", "somewhere", "soon", 
            "sorry", "specified", "specify", "specifying", "still", "sub", "such", "sup", "sure", "t's", "take", 
            "taken", "tell", "tends", "th", "than", "thank", "thanks", "thanx", "that", "that's", "thats", "the", 
            "their", "theirs", "them", "themselves", "then", "thence", "there", "there's", "thereafter", "thereby", 
            "therefore", "therein", "theres", "thereupon", "these", "they", "they'd", "they'll", "they're", "they've", 
            "think", "third", "this", "thorough", "thoroughly", "those", "though", "three", "through", "throughout", 
            "thru", "thus", "to", "together", "too", "took", "toward", "towards", "tried", "tries", "truly", "try", 
            "trying", "twice", "two", "un", "under", "unfortunately", "unless", "unlikely", "until", "unto", "up", 
            "upon", "us", "use", "used", "useful", "uses", "using", "usually", "value", "various", "very", "via", 
            "viz", "vs", "want", "wants", "was", "wasn't", "way", "we", "we'd", "we'll", "we're", "we've", "welcome", 
            "well", "went", "were", "weren't", "what", "what's", "whatever", "when", "whence", "whenever", "where", 
            "where's", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", 
            "while", "whither", "who", "who's", "whoever", "whole", "whom", "whose", "why", "will", "willing", "wish", 
            "with", "within", "without", "won't", "wonder", "would", "would", "wouldn't", "yes", "yet", "you", 
            "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves", "zero");

    /* our stop words hash that will get auto generated on init */
    this.stop_words_lookup = new Object();

    /* our words object, looks like { words1: 2, word2: 5} */
    this.words = new Object();

    /* our sorted words */
    this.sorted_words = new Array();
    
    /**
     *  init our object...
     */
    this.init = function() {
        // stop words hash...
        for(i = 0; i < this.stop_words.length; i++) {
            stopword = this.stop_words[i];
            this.stop_words_lookup[stopword] = true;
        }
        $('.word_frequency').each(function(index) {
            $(this).click(function() {
                tu_word_freq.find_words();
            });
        });
        
        // close word freq div...
        $('#word-frequency-close').click(function() {
            $('#word-frequency-div').hide();
            $('#word-frequency-list').hide();
            $('#word-frequency-spinner').show();
        });

        // close word-frequency-posts-close div
        $('#word-frequency-posts-close').click( function() {
            $('#word-frequency-posts-div').hide();
        })

        if(document.location.search.match(/wordf=true/)) {
            this.find_words();
        }
    }

    /**
     * Find words in all posts...
     */
    this.find_words = function() {
        // clear out our words object, sorted words and html...
        this.words = new Object();
        this.sorted_words = new Array();

        $('#word-frequency-words').html('&nbsp;');

        // show frequency div
        $('#word-frequency-div').show();
        //pull in and clean post texts...
        var posts = $('.reply_text');
        for(i = 0; i < posts.length; i++ ) {
            var post = posts[i];
            var post_text = post.innerHTML;
            cleaned_post_text = post_text.replace(/<.*?>/g, '').replace(/@\w+/g, '');
            var reply_id = 'reply_text-' + (i + 1);
            var words = this.get_words(cleaned_post_text, reply_id);
        }

        // sort by count
        this.sorted_words = this.sort_words();

        // show top 20 words sorted by frequency
        for(i = 0; i < this.sorted_words.length; i++) {
            if(i >= 20 ) {
                break;
            }
            var sorted_word = this.sorted_words[i]; 
            var litext = this.word_template.replace(/\${count}/, sorted_word['count']);
            var litext = litext.replace(/\${word}/, sorted_word['word']);
            var litext = litext.replace(/\${id}/, 'sorted_word' + i);
            $('#word-frequency-words').append(litext);
        }

        $('.word-frequency-word').each(function(index) {
            $(this).click(function() {
                $('#word-frequency-posts').html(' ');
                var id = $(this).attr('id');
                id = id.replace(/sorted_word/, '');
                var sorted_word = tu_word_freq.sorted_words[id];
                var word_obj = tu_word_freq.words[sorted_word['word']];
                var reply_ids = word_obj['reply_ids'];
                for (var key in reply_ids) {
                    author_id = key.replace(/reply_text/, 'post_username');
                    var post = $('#' + key).html()
                    var author = $('#' + author_id).html();
                    var post = tu_word_freq.post_template.replace(/\${post}/, post);
                    if(author) {
                        var post = post.replace(/\${author}/, author);
                        var post = post.replace(/\${author}/, '@' + author);
                    }
                    var regex = new RegExp(sorted_word['word'], 'ig');
                    post = post.toString().replace(regex, '<strong><i>' + sorted_word['word']  + '</i></strong>');
                    $('#word-frequency-posts').append(post);
                }
                $('#word-frequency-posts-div').show();
            });
        });
        // hide spinner and show words...
        $('#word-frequency-spinner').hide();
        $('#word-frequency-list').show();

    }

    /**
     * get words and counts from a post
     */
    this.get_words = function(text, reply_id) {
        var words = text.split(/\s+/g);
        words.pop(); words.shift();
        var cleaned_words = Array();
        for(j = 0; j < words.length; j++) {
            var tmp_word = words[j].toLowerCase();
            // clean a bit...
            tmp_word = tmp_word.replace(/('s|\?|\.|!|,|'s(\.|\?|!))$/g, '');
            var good_status = true;
            if(tmp_word.length < 3 || tmp_word.match(/^&/) || this.stop_words_lookup[tmp_word]) { 
                good_status = false; 
            }
            if(good_status) {
                cleaned_words[cleaned_words.length] = tmp_word;
                if(this.words[tmp_word]) {
                    var cnt = 
                    this.words[tmp_word]['count']++;
                } else {
                    this.words[tmp_word] = {count: 1};
                }
            }
            
            // store post ids with the word...
            if( this.words[tmp_word] ) {
                if(! this.words[tmp_word]['reply_ids']) {
                    this.words[tmp_word]['reply_ids'] = new Object();
                }
                if(! this.words[tmp_word]['reply_ids'][reply_id]) {
                    this.words[tmp_word]['reply_ids'][reply_id] = reply_id;
                }
            }
        }
        return cleaned_words;
    }

    /**
     * sorts words by frequency
     */
    this.sort_words = function() {
        //create an array of word counts form our object for sorting
        var wordlist = new Array();
        for (var key in this.words) {
            wordlist[wordlist.length] = {word: key, count: this.words[key]['count']};
        }

        // our comparator
        compare = function(a,b) {
            if (a.count > b.count)
               return -1;
            if (a.count < b.count)
              return 1;
            return 0;
        }
        wordlist = wordlist.sort(compare);
        return wordlist;
    }
}

var tu_word_freq = new TUWordFrequency();
tu_word_freq.init();