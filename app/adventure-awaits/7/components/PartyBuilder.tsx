'use client';
import { useState, useCallback } from 'react';

interface Character {
  id: string;
  name: string;
  image: string;
  buffs: string[];
}

const PARTY_MEMBERS: Character[] = [
  { id: 'michael', name: 'Michael', image: '/michael.png', buffs: ['+1 Compass of Conviction'] },
];

const RECRUITS: Character[] = [
  { id: 'nimar', name: 'Nimar', image: '/nimar.png', buffs: ['+5 Token Spell', '+2 Legendary Duplo Pack'] },
  { id: 'felix', name: 'Felix', image: '/felix.png', buffs: ['+7 Potion of Virality'] },
];

const ALL_BUFFS = [PARTY_MEMBERS[0], ...RECRUITS].flatMap(c => c.buffs);
const TOTAL_BUFF_COUNT = ALL_BUFFS.length;

export default function PartyBuilder({ onPartyChange }: { onPartyChange: (filledCount: number) => void }) {
  const [party, setParty] = useState<(Character | null)[]>([
    PARTY_MEMBERS[0],
    null,
    null,
  ]);
  const [availableRecruits, setAvailableRecruits] = useState<Character[]>(RECRUITS);
  const [draggedCharacter, setDraggedCharacter] = useState<Character | null>(null);
  const [dragSource, setDragSource] = useState<'recruit' | 'party' | null>(null);
  const [dragPartyIndex, setDragPartyIndex] = useState<number | null>(null);

  const addToParty = useCallback((character: Character) => {
    setParty(prev => {
      const emptyIndex = prev.findIndex(slot => slot === null);
      if (emptyIndex === -1) return prev;
      const newParty = [...prev];
      newParty[emptyIndex] = character;
      const count = newParty.filter(s => s !== null).length;
      setTimeout(() => onPartyChange(count), 0);
      return newParty;
    });
    setAvailableRecruits(prev => prev.filter(r => r.id !== character.id));
  }, [onPartyChange]);

  const removeFromParty = useCallback((slotIndex: number) => {
    setParty(prev => {
      const character = prev[slotIndex];
      if (!character || character.id === 'michael') return prev;
      const newParty = [...prev];
      newParty[slotIndex] = null;
      setAvailableRecruits(ar => [...ar, character]);
      const count = newParty.filter(s => s !== null).length;
      setTimeout(() => onPartyChange(count), 0);
      return newParty;
    });
  }, [onPartyChange]);

  // Drag from recruit area
  const handleRecruitDragStart = (e: React.DragEvent, character: Character) => {
    setDraggedCharacter(character);
    setDragSource('recruit');
    e.dataTransfer.effectAllowed = 'move';
  };

  // Drag from party slot
  const handlePartyDragStart = (e: React.DragEvent, character: Character, index: number) => {
    if (character.id === 'michael') { e.preventDefault(); return; }
    setDraggedCharacter(character);
    setDragSource('party');
    setDragPartyIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedCharacter(null);
    setDragSource(null);
    setDragPartyIndex(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Drop onto party slot
  const handlePartyDrop = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    if (draggedCharacter && dragSource === 'recruit' && party[slotIndex] === null) {
      addToParty(draggedCharacter);
    }
    setDraggedCharacter(null);
    setDragSource(null);
    setDragPartyIndex(null);
  };

  // Drop onto recruit area (remove from party)
  const handleRecruitAreaDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedCharacter && dragSource === 'party' && dragPartyIndex !== null) {
      removeFromParty(dragPartyIndex);
    }
    setDraggedCharacter(null);
    setDragSource(null);
    setDragPartyIndex(null);
  };

  const filledCount = party.filter(slot => slot !== null).length;
  const felixInParty = party.some(slot => slot?.id === 'felix');
  const activeBuffs = party.filter((slot): slot is Character => slot !== null);

  return (
    <div className="mt-12 pb-4 w-full max-w-2xl" style={{ fontFamily: 'monospace' }}>
      <div
        className="p-3 sm:p-4 md:p-6 transition-all duration-700"
        style={{
          border: felixInParty ? '3px solid #ed702e' : '3px solid currentColor',
          borderRadius: '2px',
          boxShadow: felixInParty ? '4px 4px 0 #ed702e' : '4px 4px 0 currentColor',
        }}
      >
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] opacity-60">
            <span style={{ fontSize: '2.8em', lineHeight: '1', verticalAlign: '-0.15em' }}>&#9876;</span> Join Party
          </span>
          <span className="text-[10px] sm:text-xs opacity-40">
            {filledCount}/3
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6">
          {/* Recruits */}
          <div
            className="flex flex-col items-center gap-1.5 sm:gap-2 shrink-0"
            onDragOver={dragSource === 'party' ? handleDragOver : undefined}
            onDrop={dragSource === 'party' ? handleRecruitAreaDrop : undefined}
          >
            <span className="text-[8px] sm:text-[10px] uppercase tracking-widest opacity-30">Available</span>
            <div className="flex gap-1.5 sm:gap-2">
              {RECRUITS.map(recruit => {
                const isAvailable = availableRecruits.some(r => r.id === recruit.id);
                return (
                  <div
                    key={recruit.id}
                    draggable={isAvailable}
                    onDragStart={e => handleRecruitDragStart(e, recruit)}
                    onDragEnd={handleDragEnd}
                    onClick={() => isAvailable && addToParty(recruit)}
                    className={`transition-all duration-300 bg-white ${
                      isAvailable
                        ? 'opacity-100 hover:scale-110 cursor-pointer'
                        : 'opacity-10 cursor-default'
                    }`}
                    style={{
                      width: 'clamp(5rem, 20vw, 6rem)',
                      height: 'clamp(5rem, 20vw, 6rem)',
                      border: isAvailable ? '2px solid currentColor' : '2px dashed currentColor',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={recruit.image}
                      alt={recruit.name}
                      className="w-full h-full object-cover object-top pointer-events-none"
                      draggable={false}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Arrow */}
          <div className="opacity-30 select-none sm:rotate-0 rotate-90 text-xl sm:text-2xl sm:mt-6" style={{ fontFamily: 'monospace' }}>
            &#x25B6;
          </div>

          {/* Party Slots */}
          <div className="flex flex-col items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="text-[8px] sm:text-[10px] uppercase tracking-widest opacity-30">Party</span>
            <div className="flex gap-1.5 sm:gap-2">
              {party.map((slot, index) => (
                <div
                  key={index}
                  draggable={!!slot && slot.id !== 'michael'}
                  onDragStart={slot && slot.id !== 'michael' ? (e) => handlePartyDragStart(e, slot, index) : undefined}
                  onDragEnd={handleDragEnd}
                  onDragOver={slot === null && dragSource === 'recruit' ? handleDragOver : undefined}
                  onDrop={slot === null && dragSource === 'recruit' ? (e) => handlePartyDrop(e, index) : undefined}
                  onClick={() => slot && slot.id !== 'michael' && removeFromParty(index)}
                  className={`transition-all duration-500 ${
                    slot
                      ? 'bg-white ' + (slot.id !== 'michael' ? 'opacity-90 cursor-pointer hover:opacity-70' : 'opacity-90')
                      : draggedCharacter && dragSource === 'recruit'
                        ? 'opacity-50'
                        : 'opacity-20'
                  }`}
                  style={{
                    width: 'clamp(5rem, 20vw, 6rem)',
                    height: 'clamp(5rem, 20vw, 6rem)',
                    border: slot ? '2px solid currentColor' : '2px dashed currentColor',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    animation: !slot && draggedCharacter && dragSource === 'recruit' ? 'pulse 1.5s ease-in-out infinite' : undefined,
                  }}
                >
                  {slot ? (
                    <img
                      src={slot.image}
                      alt={slot.name}
                      className="w-full h-full object-cover object-top pointer-events-none"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-30">
                      <span className="text-base">?</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Buffs */}
        <div className="mt-3 sm:mt-4 flex flex-wrap justify-center sm:justify-start gap-1 text-[8px] sm:text-[9px] tracking-wider" style={{ minHeight: '2.8em', lineHeight: '1.4' }}>
          {activeBuffs.flatMap(character =>
            character.buffs.map(buff => (
              <span
                key={`${character.id}-${buff}`}
                className="opacity-50 transition-opacity duration-500"
                style={{
                  border: '1px solid currentColor',
                  borderRadius: '2px',
                  padding: '1px 4px',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                {buff}
              </span>
            ))
          )}
        </div>

        {/* Status bar */}
        <div className="mt-3 sm:mt-4 pt-2 sm:pt-3" style={{ borderTop: '1px solid currentColor', opacity: 0.3 }}>
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="h-1 sm:h-1.5 flex-1 transition-all duration-500"
                style={{
                  backgroundColor: i < filledCount ? 'currentColor' : 'transparent',
                  border: '1px solid currentColor',
                  borderRadius: '1px',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <p
        className={`mt-4 text-[10px] sm:text-xs text-center transition-opacity duration-500 ${
          filledCount >= 3 ? 'opacity-40' : 'opacity-0'
        }`}
        style={{ fontFamily: 'monospace', letterSpacing: '0.1em', minHeight: '1.5em' }}
      >
        &#9733; Party assembled. Ready... &#9733;
      </p>
    </div>
  );
}
