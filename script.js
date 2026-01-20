class SentenceCycler {
    constructor() {
        // Guitar practice reminders - edit these directly in the code
        this.sentences = [
            // Left hand technique
            "Is my finger close enough to the fret?",
            "Are my fingers arched?",
            "Am I muting the strings that should not make a sound?",
            "Am I putting too much pressure on my fretting fingers?",
            "Am I putting too much pressure on my thumb?",
            "Is my thumb straight?",

            // Right hand technique  
            "Is my movement coming from my elbow?",
            "Is my movement not coming from my wrist?",
            "Am I holding the pick with 3 fingers?",
            "Am I lifting my ring finger and pinky?",
            "Is Mario creepily standing behind me and rotating my hand slightly with some string?",
            "Am I brushing the strings to mute them?",

            // Posture and body awareness
            "Are my shoulders relaxed?",
            "Is my back straight?",
            "Am I sitting up properly?",
            "Are my feet flat on the floor?",
            "Is the guitar positioned correctly on my body?",
            "Am I leaning forward too much?",
            "Is my neck relaxed?",
            "Are my arms in a natural position?",

            // Timing and rhythm
            "Am I playing in time?",
            "Am I rushing this passage?",
            "Am I dragging behind the beat?",
            "Can I feel the pulse?",
            "Am I counting in my head?",
            "Is my internal metronome steady?",
            "Am I breathing with the music?",

            // Sound quality
            "Are my notes ringing clearly?",
            "Am I getting a clean sound?",
            "Is there any unwanted buzzing?",
            "Am I striking the strings evenly?",
            "Is my tone consistent?",
            "Am I controlling my dynamics?",
            "Can I hear each note distinctly?",

            // Focus and mindfulness
            "Am I present in this moment?",
            "What am I actually hearing?",
            "Am I listening to myself play?",
            "Where is my attention right now?",
            "Am I focused on the music?",
            "What does this phrase want to express?",
            "Am I playing with intention?",

            // Technical awareness
            "Are my transitions smooth?",
            "Am I preparing my next finger position?",
            "Is my fingering efficient?",
            "Am I using the minimum necessary force?",
            "Are my movements economical?",
            "Am I anticipating the next chord?",
            "Is my hand position optimal for what's coming next?",

            // Breathing and tension
            "Am I holding my breath?",
            "Where am I carrying tension?",
            "Can I release unnecessary muscle tension?",
            "Am I breathing naturally?",
            "Are my jaw and face relaxed?",
            "Is my grip too tight?",
            "Can I play this more relaxed?",

            // Practice mindset
            "What am I trying to improve right now?",
            "Am I practicing or just playing?",
            "What specific goal do I have for this repetition?",
            "Am I being patient with myself?",
            "What did I just learn from that mistake?",
            "How can I make this easier?",
            "Am I challenging myself appropriately?",

            // Musical expression
            "What story am I telling?",
            "How does this phrase want to move?",
            "Am I playing with emotion?",
            "What is the character of this music?",
            "Am I connecting phrases musically?",
            "Where is the musical line going?",
            "Am I serving the music or just the technique?",

            // Tempo and control
            "Can I play this slower and still maintain quality?",
            "Am I in control of the tempo?",
            "Can I speed up without losing accuracy?",
            "Am I playing at a tempo where I can think ahead?",
            "Is this the right speed for learning?",
            "Can I maintain this tempo consistently?",

            // Finger independence
            "Are my unused fingers staying relaxed?",
            "Am I moving only the fingers I need to move?",
            "Is each finger working independently?",
            "Am I keeping my other fingers close to the strings?",
            "Are my fingers moving efficiently?",

            // Intonation and pitch
            "Am I playing in tune?",
            "Are my bends reaching the right pitch?",
            "Is my vibrato controlled?",
            "Am I hearing the pitch relationships?",
            "Are my harmonics ringing true?",

            // Coordination
            "Are my hands working together?",
            "Is my picking synchronized with my fretting?",
            "Am I coordinating both hands smoothly?",
            "Is there any disconnect between my hands?",
            "Are my hands supporting each other?",

            // Mental state
            "Am I being too hard on myself?",
            "Can I approach this with curiosity instead of judgment?",
            "What would happen if I played this with more confidence?",
            "Am I enjoying this process?",
            "What am I grateful for in my playing right now?",
            "How can I make this more playful?",

            // Specific technique checks
            "Am I muting properly between notes?",
            "Is my pick angle consistent?",
            "Am I using the right amount of pick?",
            "Are my chord changes clean?",
            "Is my strumming pattern clear?",
            "Am I damping unwanted strings?",

            // Listening skills
            "What do I hear that I want to change?",
            "Am I listening to the whole musical picture?",
            "Can I hear the bass line while playing melody?",
            "Am I aware of the harmonic context?",
            "What is my ear telling me?",

            // Physical comfort
            "Does anything hurt or feel strained?",
            "Can I play this for longer without discomfort?",
            "Is my setup ergonomically sound?",
            "Am I taking breaks when I need them?",
            "Is my practice sustainable?",

            // Progress awareness
            "What's better about my playing today than yesterday?",
            "What specific improvement can I make right now?",
            "Am I building good habits?",
            "What pattern do I keep repeating?",
            "How can I break through this plateau?",
            "What would my teacher notice about my playing right now?",
        ];
        
        this.currentIndex = 0;
        this.isRunning = false;
        this.intervalId = null;
        this.progressIntervalId = null;
        this.ratings = this.loadRatings();

        this.elements = {
            currentSentence: document.getElementById('currentSentence'),
            intervalInput: document.getElementById('interval'),
            startBtn: document.getElementById('startBtn'),
            stopBtn: document.getElementById('stopBtn'),
            sentenceCounter: document.getElementById('sentenceCounter'),
            cycleStatus: document.getElementById('cycleStatus'),
            progress: document.getElementById('progress'),
            ratingButtons: document.getElementById('ratingButtons')
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDisplay();
    }

    loadRatings() {
        try {
            const saved = localStorage.getItem('guitarSentenceRatings');
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error('Error loading ratings:', error);
            return {};
        }
    }

    saveRatings() {
        try {
            localStorage.setItem('guitarSentenceRatings', JSON.stringify(this.ratings));
        } catch (error) {
            console.error('Error saving ratings:', error);
        }
    }

    rateSentence(rating) {
        this.ratings[this.currentIndex] = rating;
        this.saveRatings();
        this.updateRatingDisplay();
    }

    updateRatingDisplay() {
        const rating = this.ratings[this.currentIndex];
        const buttons = this.elements.ratingButtons.querySelectorAll('button');
        
        // Reset all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Highlight active rating
        if (rating) {
            const activeButton = this.elements.ratingButtons.querySelector(`[data-rating="${rating}"]`);
            if (activeButton) {
                activeButton.classList.add('active');
            }
        }
    }

    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (this.isRunning) {
                    this.stop();
                } else {
                    this.start();
                }
            }

            // Arrow keys to adjust cycle time
            if (e.code === 'ArrowUp') {
                e.preventDefault();
                this.adjustCycleTime(1);
            }

            if (e.code === 'ArrowDown') {
                e.preventDefault();
                this.adjustCycleTime(-1);
            }

            // Rating shortcuts: Q=good, W=okay, E=bad
            if (e.code === 'KeyQ') {
                e.preventDefault();
                this.rateSentence('good');
            }

            if (e.code === 'KeyW') {
                e.preventDefault();
                this.rateSentence('okay');
            }

            if (e.code === 'KeyE') {
                e.preventDefault();
                this.rateSentence('bad');
            }
        });

        // Button clicks
        this.elements.startBtn.addEventListener('click', () => this.start());
        this.elements.stopBtn.addEventListener('click', () => this.stop());

        // Rating button clicks
        this.elements.ratingButtons.addEventListener('click', (e) => {
            if (e.target.dataset.rating) {
                this.rateSentence(e.target.dataset.rating);
            }
        });

        // Interval change
        this.elements.intervalInput.addEventListener('change', () => {
            if (this.isRunning) {
                this.stop();
                this.start();
            }
        });
    }
    
    adjustCycleTime(change) {
        const currentValue = parseInt(this.elements.intervalInput.value);
        const newValue = Math.max(1, Math.min(60, currentValue + change));
        
        this.elements.intervalInput.value = newValue;
        
        // If currently running, restart with new interval
        if (this.isRunning) {
            this.stop();
            this.start();
        }
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.elements.startBtn.disabled = true;
        this.elements.stopBtn.disabled = false;
        this.elements.cycleStatus.textContent = 'Running';
        
        const interval = parseInt(this.elements.intervalInput.value) * 1000;
        
        // Show first sentence immediately
        this.showCurrentSentence();
        
        // Start cycling
        this.intervalId = setInterval(() => {
            this.nextSentence();
        }, interval);
        
        // Start progress bar animation
        this.startProgressBar(interval);
    }
    
    stop() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        this.elements.startBtn.disabled = false;
        this.elements.stopBtn.disabled = true;
        this.elements.cycleStatus.textContent = 'Stopped';
        
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        
        if (this.progressIntervalId) {
            clearInterval(this.progressIntervalId);
            this.progressIntervalId = null;
        }
        
        this.elements.progress.style.width = '0%';
    }
    
    nextSentence() {
        // Pure random selection
        const randomIndex = Math.floor(Math.random() * this.sentences.length);
        this.currentIndex = randomIndex;
        this.showCurrentSentence();
    }
    
    showCurrentSentence() {
        // Fade out
        this.elements.currentSentence.style.opacity = '0';
        
        setTimeout(() => {
            this.elements.currentSentence.textContent = this.sentences[this.currentIndex];
            this.updateDisplay();
            this.updateRatingDisplay();
            // Fade in
            this.elements.currentSentence.style.opacity = '1';
        }, 250);
    }
    
    updateDisplay() {
        this.elements.sentenceCounter.textContent = 
            `${this.currentIndex + 1} / ${this.sentences.length}`;
    }
    
    startProgressBar(interval) {
        this.elements.progress.style.width = '0%';
        this.elements.progress.style.transition = `width ${interval}ms linear`;
        
        // Reset and start progress
        setTimeout(() => {
            this.elements.progress.style.width = '100%';
        }, 50);
        
        // Reset progress bar every cycle
        this.progressIntervalId = setInterval(() => {
            this.elements.progress.style.transition = 'none';
            this.elements.progress.style.width = '0%';
            
            setTimeout(() => {
                this.elements.progress.style.transition = `width ${interval}ms linear`;
                this.elements.progress.style.width = '100%';
            }, 50);
        }, interval);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SentenceCycler();
});