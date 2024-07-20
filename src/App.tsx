import React, { useState, useEffect } from 'react';
import './App.css';
import Hamster from './icons/Hamster';
import { binanceLogo, dailyCipher, dailyCombo, dailyReward, dollarCoin, hamsterCoin, mainCharacter } from './images';
import Info from './icons/Info';
import Settings from './icons/Settings';
import Mine from './icons/Mine';
import Friends from './icons/Friends';
import Coins from './icons/Coins';
import { db, doc, getDoc, setDoc } from './firebase';

const App: React.FC = () => {
    const levelNames = [
        "Bronze Ape", "Silver Ape", "Gold Ape", "Platinum Ape", "Diamond Ape", 
        "Epic Ape", "Legendary Ape", "Master Ape", "GrandMaster Ape", "Lord Ape"
    ];

    const levelMinPoints = [
        0, 5000, 25000, 100000, 1000000, 2000000, 10000000, 50000000, 
        100000000, 1000000000
    ];

    const [levelIndex, setLevelIndex] = useState(6);
    const [points, setPoints] = useState(22749365);
    const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
    const pointsToAdd = 11;
    const profitPerHour = 126420;

    const [dailyRewardTimeLeft, setDailyRewardTimeLeft] = useState("");
    const [dailyCipherTimeLeft, setDailyCipherTimeLeft] = useState("");
    const [dailyComboTimeLeft, setDailyComboTimeLeft] = useState("");
    const [userName, setUserName] = useState('Loading...');

    const calculateTimeLeft = (targetHour: number) => {
        const now = new Date();
        const target = new Date(now);
        target.setUTCHours(targetHour, 0, 0, 0);

        if (now.getUTCHours() >= targetHour) {
            target.setUTCDate(target.getUTCDate() + 1);
        }

        const diff = target.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const updateCountdowns = () => {
            setDailyRewardTimeLeft(calculateTimeLeft(0));
            setDailyCipherTimeLeft(calculateTimeLeft(19));
            setDailyComboTimeLeft(calculateTimeLeft(12));
        };

        updateCountdowns();
        const interval = setInterval(updateCountdowns, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
        setTimeout(() => {
            card.style.transform = '';
        }, 100);

        setPoints(prevPoints => prevPoints + pointsToAdd);
        setClicks(prevClicks => [...prevClicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
    };

    const handleAnimationEnd = (id: number) => {
        setClicks(prevClicks => prevClicks.filter(click => click.id !== id));
    };

    const calculateProgress = () => {
        if (levelIndex >= levelNames.length - 1) return 100;
        const currentLevelMin = levelMinPoints[levelIndex];
        const nextLevelMin = levelMinPoints[levelIndex + 1];
        const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
        return Math.min(progress, 100);
    };

    useEffect(() => {
        const currentLevelMin = levelMinPoints[levelIndex];
        const nextLevelMin = levelMinPoints[levelIndex + 1];
        if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
            setLevelIndex(levelIndex + 1);
        } else if (points < currentLevelMin && levelIndex > 0) {
            setLevelIndex(levelIndex - 1);
        }
    }, [points, levelIndex, levelMinPoints, levelNames.length]);

    const formatProfitPerHour = (profit: number) => {
        if (profit >= 1000000000) return `+${(profit / 1000000000).toFixed(2)}B`;
        if (profit >= 1000000) return `+${(profit / 1000000).toFixed(2)}M`;
        if (profit >= 1000) return `+${(profit / 1000).toFixed(2)}K`;
        return `+${profit}`;
    };

    useEffect(() => {
        const pointsPerSecond = Math.floor(profitPerHour / 3600);
        const interval = setInterval(() => {
            setPoints(prevPoints => prevPoints + pointsPerSecond);
        }, 1000);
        return () => clearInterval(interval);
    }, [profitPerHour]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = 'userId'; // Hier sollte die tatsächliche Benutzer-ID eingefügt werden
                console.log('Fetching user data for user ID:', userId); // Debugging
                const userDoc = doc(db, 'users', userId);
                const userSnap = await getDoc(userDoc);
                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    console.log('User data fetched successfully:', userData); // Debugging
                    setUserName(userData.name || 'No Name');
                    setPoints(userData.points || points); // Initialize points if available
                } else {
                    console.log('No such document!');
                    setUserName('No Name');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUserName('No Name');
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const updateUserPoints = async () => {
            try {
                const userId = 'userId'; // Hier sollte die tatsächliche Benutzer-ID eingefügt werden
                console.log('Updating points for user ID:', userId); // Debugging
                const userDoc = doc(db, 'users', userId);
                await setDoc(userDoc, { points }, { merge: true });
                console.log('User points updated successfully'); // Debugging
            } catch (error) {
                console.error('Error updating user points:', error);
            }
        };

        updateUserPoints();
    }, [points]);

    return (
        <div className="bg-black flex justify-center">
            <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl">
                <div className="px-4 z-10">
                    <div className="flex items-center space-x-2 pt-4">
                        <div className="p-1 rounded-lg bg-[#1d2025]">
                            <Hamster size={24} className="text-[#d4d4d4]" />
                        </div>
                        <div>
                            <p className="text-sm">{userName} (CEO)</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between space-x-4 mt-1">
                        <div className="flex items-center w-1/3">
                            <div className="w-full">
                                <div className="flex justify-between">
                                    <p className="text-sm">{levelNames[levelIndex]}</p>
                                    <p className="text-sm">{levelIndex + 1} <span className="text-[#95908a]">/ {levelNames.length}</span></p>
                                </div>
                                <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                                    <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                                        <div className="progress-gradient h-2 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center w-2/3 border-2 border-[#43433b] rounded-full px-4 py-[2px] bg-[#43433b]/[0.6] max-w-[200px]">
                            <div className="h-5 w-5">
                                <img src={hamsterCoin} alt="Hamster Coin" />
                            </div>
                            <div className="ml-2">
                                <p>{points}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-grow flex items-center justify-center">
                    <div
                        className="w-48 h-64 bg-[#29292e] rounded-xl flex flex-col items-center justify-center text-center cursor-pointer"
                        onClick={handleCardClick}
                    >
                        <img src={mainCharacter} alt="Main Character" className="w-24 h-24" />
                        <p className="mt-4">Click me!</p>
                    </div>
                </div>
                <div className="px-4 pb-4 z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="p-2 rounded-lg bg-[#1d2025]">
                                <Mine size={24} className="text-[#d4d4d4]" />
                            </div>
                            <div>
                                <p className="text-sm">Daily Reward</p>
                                <p className="text-sm text-[#95908a]">{dailyRewardTimeLeft}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="p-2 rounded-lg bg-[#1d2025]">
                                <Friends size={24} className="text-[#d4d4d4]" />
                            </div>
                            <div>
                                <p className="text-sm">Daily Cipher</p>
                                <p className="text-sm text-[#95908a]">{dailyCipherTimeLeft}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="p-2 rounded-lg bg-[#1d2025]">
                                <Coins size={24} className="text-[#d4d4d4]" />
                            </div>
                            <div>
                                <p className="text-sm">Daily Combo</p>
                                <p className="text-sm text-[#95908a]">{dailyComboTimeLeft}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {clicks.map(click => (
                <div
                    key={click.id}
                    className="absolute pointer-events-none"
                    style={{ top: click.y, left: click.x }}
                    onAnimationEnd={() => handleAnimationEnd(click.id)}
                >
                    <img src={dollarCoin} alt="Dollar Coin" className="w-8 h-8 animate-ping" />
                </div>
            ))}
        </div>
    );
};

export default App;