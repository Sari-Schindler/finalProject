const yahooFinance = require('yahoo-finance2').default;

class StockStrategyAnalyzer {
    constructor(stockSymbol, strategy, params, startDate, endDate) {
        this.stockSymbol = stockSymbol;
        this.strategy = strategy;
        this.params = params;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    async fetchHistoricalData() {
        const queryOptions = { period1: this.startDate, period2: this.endDate, interval: '1d' };
        const result = await yahooFinance.historical(this.stockSymbol, queryOptions);
        return result.map(entry => ({
            date: entry.date,
            close: entry.close,
            high: entry.high,
            low: entry.low,
            open: entry.open,
            volume: entry.volume
        }));
    }

    calculateMovingAverage(data, period) {
        return data.map((entry, index, arr) => {
            if (index < period - 1) {
                return { date: entry.date, ma: null };
            }
            const slice = arr.slice(index - period + 1, index + 1);
            const sum = slice.reduce((acc, val) => acc + val.close, 0);
            const ma = sum / period;
            return { date: entry.date, ma };
        });
    }

    calculateRSI(data, period) {
        let gains = 0, losses = 0;
        for (let i = 1; i <= period; i++) {
            const change = data[i].close - data[i - 1].close;
            if (change > 0) {
                gains += change;
            } else {
                losses -= change;
            }
        }

        let avgGain = gains / period;
        let avgLoss = losses / period;
        const rs = avgGain / avgLoss;
        const rsi = 100 - (100 / (1 + rs));

        let rsiValues = [{ date: data[period - 1].date, rsi }];
        for (let i = period; i < data.length; i++) {
            const change = data[i].close - data[i - 1].close;
            if (change > 0) {
                avgGain = (avgGain * (period - 1) + change) / period;
                avgLoss = (avgLoss * (period - 1)) / period;
            } else {
                avgGain = (avgGain * (period - 1)) / period;
                avgLoss = (avgLoss * (period - 1) - change) / period;
            }
            const rs = avgGain / avgLoss;
            const rsi = 100 - (100 / (1 + rs));
            rsiValues.push({ date: data[i].date, rsi });
        }

        return rsiValues;
    }

    calculateBollingerBands(data, period, multiplier) {
        const ma = this.calculateMovingAverage(data, period);
        return ma.map((entry, index) => {
            if (entry.ma === null) {
                return { date: entry.date, ma: null, upper: null, lower: null };
            }
            const slice = data.slice(index - period + 1, index + 1);
            const variance = slice.reduce((acc, val) => acc + Math.pow(val.close - entry.ma, 2), 0) / period;
            const stdDev = Math.sqrt(variance);
            return { date: entry.date, ma: entry.ma, upper: entry.ma + multiplier * stdDev, lower: entry.ma - multiplier * stdDev };
        });
    }

    calculateMACD(data, shortTermPeriod, longTermPeriod, signalPeriod) {
        const shortTermMA = this.calculateMovingAverage(data, shortTermPeriod);
        const longTermMA = this.calculateMovingAverage(data, longTermPeriod);

        const macdLine = shortTermMA.map((entry, index) => {
            if (entry.ma === null || longTermMA[index].ma === null) {
                return { date: entry.date, macd: null };
            }
            return { date: entry.date, macd: entry.ma - longTermMA[index].ma };
        });

        const signalLine = this.calculateMovingAverage(macdLine.map(entry => ({ ...entry, close: entry.macd || 0 })), signalPeriod);
        return macdLine.map((entry, index) => ({
            date: entry.date,
            macd: entry.macd,
            signal: signalLine[index].ma
        }));
    }

    async analyzeStrategy() {
        const data = await this.fetchHistoricalData();
        let signals = [];

        switch (this.strategy) {
            case 'movingAverageCrossover':
                signals = this.analyzeMovingAverageCrossover(data);
                break;
            case 'RSI':
                signals = this.analyzeRSI(data);
                break;
            case 'bollingerBands':
                signals = this.analyzeBollingerBands(data);
                break;
            case 'MACD':
                signals = this.analyzeMACD(data);
                break;
            case 'supportResistance':
                signals = this.analyzeSupportResistance(data);
                break;
            case 'fibonacciRetracement':
                signals = this.analyzeFibonacciRetracement(data);
                break;
            case 'volumeAnalysis':
                signals = this.analyzeVolumeAnalysis(data);
                break;
            case 'candlestickPatterns':
                signals = this.analyzeCandlestickPatterns(data);
                break;
            case 'trendFollowing':
                signals = this.analyzeTrendFollowing(data);
                break;
            case 'meanReversion':
                signals = this.analyzeMeanReversion(data);
                break;
            default:
                throw new Error('Unknown strategy');
        }

        let profits = [];
        for (let i = 0; i < signals.length - 1; i++) {
            if (signals[i].type === 'BUY' && signals[i + 1].type === 'SELL') {
                const profit = (signals[i + 1].price - signals[i].price) / signals[i].price * 100;
                profits.push({
                    buyDate: signals[i].date,
                    buyPrice: signals[i].price,
                    sellDate: signals[i + 1].date,
                    sellPrice: signals[i + 1].price,
                    profit: profit.toFixed(2)
                });
            }
        }

        return profits;
    }

    analyzeMovingAverageCrossover(data) {
        const shortTermMA = this.calculateMovingAverage(data, this.params.shortTermPeriod);
        const longTermMA = this.calculateMovingAverage(data, this.params.longTermPeriod);
        let signals = [];

        for (let i = 0; i < data.length; i++) {
            if (shortTermMA[i].ma !== null && longTermMA[i].ma !== null) {
                const previousSignal = signals[signals.length - 1];
                if (shortTermMA[i].ma > longTermMA[i].ma) {
                    if (!previousSignal || previousSignal.type !== 'BUY') {
                        signals.push({ date: data[i].date, type: 'BUY', price: data[i].close });
                    }
                } else if (shortTermMA[i].ma < longTermMA[i].ma) {
                    if (!previousSignal || previousSignal.type !== 'SELL') {
                        signals.push({ date: data[i].date, type: 'SELL', price: data[i].close });
                    }
                }
            }
        }
        return signals;
    }

    analyzeRSI(data) {
        const rsiValues = this.calculateRSI(data, this.params.period);
        let signals = [];

        for (let i = 0; i < rsiValues.length; i++) {
            const previousSignal = signals[signals.length - 1];
            if (rsiValues[i].rsi < this.params.buyThreshold) {
                if (!previousSignal || previousSignal.type !== 'BUY') {
                    signals.push({ date: data[i].date, type: 'BUY', price: data[i].close });
                }
            } else if (rsiValues[i].rsi > this.params.sellThreshold) {
                if (!previousSignal || previousSignal.type !== 'SELL') {
                    signals.push({ date: data[i].date, type: 'SELL', price: data[i].close });
                }
            }
        }
        return signals;
    }

    analyzeBollingerBands(data) {
        const bands = this.calculateBollingerBands(data, this.params.period, this.params.multiplier);
        let signals = [];

        for (let i = 0; i < bands.length; i++) {
            const previousSignal = signals[signals.length - 1];
            if (data[i].close < bands[i].lower) {
                if (!previousSignal || previousSignal.type !== 'BUY') {
                    signals.push({ date: data[i].date, type: 'BUY', price: data[i].close });
                }
            } else if (data[i].close > bands[i].upper) {
                if (!previousSignal || previousSignal.type !== 'SELL') {
                    signals.push({ date: data[i].date, type: 'SELL', price: data[i].close });
                }
            }
        }
        return signals;
    }

    analyzeMACD(data) {
        const macdData = this.calculateMACD(data, this.params.shortTermPeriod, this.params.longTermPeriod, this.params.signalPeriod);
        let signals = [];

        for (let i = 0; i < macdData.length; i++) {
            if (macdData[i].macd !== null && macdData[i].signal !== null) {
                const previousSignal = signals[signals.length - 1];
                if (macdData[i].macd > macdData[i].signal) {
                    if (!previousSignal || previousSignal.type !== 'BUY') {
                        signals.push({ date: data[i].date, type: 'BUY', price: data[i].close });
                    }
                } else if (macdData[i].macd < macdData[i].signal) {
                    if (!previousSignal || previousSignal.type !== 'SELL') {
                        signals.push({ date: data[i].date, type: 'SELL', price: data[i].close });
                    }
                }
            }
        }
        return signals;
    }

    analyzeSupportResistance(data) {
        // Placeholder for support and resistance analysis logic
        // To be implemented based on specific user requirements
        let signals = [];
        // Implement support/resistance logic here
        return signals;
    }

    analyzeFibonacciRetracement(data) {
        // Placeholder for Fibonacci retracement analysis logic
        // To be implemented based on specific user requirements
        let signals = [];
        // Implement Fibonacci retracement logic here
        return signals;
    }

    analyzeVolumeAnalysis(data) {
        let signals = [];
        for (let i = 1; i < data.length; i++) {
            const previousSignal = signals[signals.length - 1];
            if (data[i].close > data[i - 1].close && data[i].volume > data[i - 1].volume) {
                if (!previousSignal || previousSignal.type !== 'BUY') {
                    signals.push({ date: data[i].date, type: 'BUY', price: data[i].close });
                }
            } else if (data[i].close < data[i - 1].close && data[i].volume > data[i - 1].volume) {
                if (!previousSignal || previousSignal.type !== 'SELL') {
                    signals.push({ date: data[i].date, type: 'SELL', price: data[i].close });
                }
            }
        }
        return signals;
    }

    analyzeCandlestickPatterns(data) {
        // Placeholder for candlestick pattern analysis logic
        // To be implemented based on specific user requirements
        let signals = [];
        // Implement candlestick pattern logic here
        return signals;
    }

    analyzeTrendFollowing(data) {
        let signals = [];
        for (let i = 1; i < data.length; i++) {
            const previousSignal = signals[signals.length - 1];
            if (data[i].close > data[i - 1].close) {
                if (!previousSignal || previousSignal.type !== 'BUY') {
                    signals.push({ date: data[i].date, type: 'BUY', price: data[i].close });
                }
            } else if (data[i].close < data[i - 1].close) {
                if (!previousSignal || previousSignal.type !== 'SELL') {
                    signals.push({ date: data[i].date, type: 'SELL', price: data[i].close });
                }
            }
        }
        return signals;
    }

    analyzeMeanReversion(data) {
        const mean = data.reduce((acc, val) => acc + val.close, 0) / data.length;
        let signals = [];
        for (let i = 0; i < data.length; i++) {
            const previousSignal = signals[signals.length - 1];
            if (data[i].close < mean * (1 - this.params.threshold)) {
                if (!previousSignal || previousSignal.type !== 'BUY') {
                    signals.push({ date: data[i].date, type: 'BUY', price: data[i].close });
                }
            } else if (data[i].close > mean * (1 + this.params.threshold)) {
                if (!previousSignal || previousSignal.type !== 'SELL') {
                    signals.push({ date: data[i].date, type: 'SELL', price: data[i].close });
                }
            }
        }
        return signals;
    }
}

module.exports = StockStrategyAnalyzer;

