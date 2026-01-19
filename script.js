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
        ];
        
        this.currentIndex = 0;
        this.isRunning = false;
        this.intervalId = null;
        this.progressIntervalId = null;
        
        this.elements = {
            currentSentence: document.getElementById('currentSentence'),
            intervalInput: document.getElementById('interval'),
            startBtn: document.getElementById('startBtn'),
            stopBtn: document.getElementById('stopBtn'),
            sentenceCounter: document.getElementById('sentenceCounter'),
            cycleStatus: document.getElementById('cycleStatus'),
            progress: document.getElementById('progress')
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateDisplay();
    }
    
    setupEventListeners() {
        // Spacebar to start/stop
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
        });
        
        // Button clicks
        this.elements.startBtn.addEventListener('click', () => this.start());
        this.elements.stopBtn.addEventListener('click', () => this.stop());
        
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