import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  if (!isOpen) return null;

  const dataCm = [
    { size: 'XS', eu: '34', us: '2', chest: '82 - 86', waist: '62 - 66', hips: '88 - 92' },
    { size: 'S', eu: '36', us: '4', chest: '86 - 90', waist: '66 - 70', hips: '92 - 96' },
    { size: 'M', eu: '38', us: '6', chest: '90 - 94', waist: '70 - 74', hips: '96 - 100' },
    { size: 'L', eu: '40', us: '8', chest: '94 - 98', waist: '74 - 78', hips: '100 - 104' },
    { size: 'XL', eu: '42', us: '10', chest: '98 - 104', waist: '78 - 84', hips: '104 - 110' }
  ];

  const dataIn = [
    { size: 'XS', eu: '34', us: '2', chest: '32.2 - 33.8', waist: '24.4 - 26.0', hips: '34.6 - 36.2' },
    { size: 'S', eu: '36', us: '4', chest: '33.8 - 35.4', waist: '26.0 - 27.5', hips: '36.2 - 37.8' },
    { size: 'M', eu: '38', us: '6', chest: '35.4 - 37.0', waist: '27.5 - 29.1', hips: '37.8 - 39.4' },
    { size: 'L', eu: '40', us: '8', chest: '37.0 - 38.5', waist: '29.1 - 30.7', hips: '39.4 - 41.0' },
    { size: 'XL', eu: '42', us: '10', chest: '38.5 - 41.0', waist: '30.7 - 33.0', hips: '41.0 - 43.3' }
  ];

  const rows = unit === 'cm' ? dataCm : dataIn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white w-full max-w-2xl shadow-2xl z-10 border border-black/10 p-6 md:p-8 animate-fade-in">
        <div className="flex items-center justify-between pb-4 border-b border-black/10">
          <div className="flex items-center gap-2">
            <Ruler size={18} />
            <span className="font-zara-serif text-xl font-bold tracking-tight uppercase">
              GARMENT MEASUREMENT & FIT MATRIX
            </span>
          </div>
          <button onClick={onClose} className="p-1 hover:text-neutral-500">
            <X size={20} />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex justify-end gap-2 my-4 text-xs font-mono">
          <button
            onClick={() => setUnit('cm')}
            className={`px-3 py-1 border ${unit === 'cm' ? 'bg-black text-white border-black font-bold' : 'border-neutral-200'}`}
          >
            METRIC (CM)
          </button>
          <button
            onClick={() => setUnit('in')}
            className={`px-3 py-1 border ${unit === 'in' ? 'bg-black text-white border-black font-bold' : 'border-neutral-200'}`}
          >
            IMPERIAL (INCHES)
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b-2 border-black tracking-widest text-[10px] text-neutral-500 uppercase">
                <th className="py-2.5">SIZE</th>
                <th className="py-2.5">EU</th>
                <th className="py-2.5">US</th>
                <th className="py-2.5">CHEST</th>
                <th className="py-2.5">WAIST</th>
                <th className="py-2.5">HIPS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {rows.map((row) => (
                <tr key={row.size} className="hover:bg-neutral-50">
                  <td className="py-3 font-bold text-black">{row.size}</td>
                  <td className="py-3 text-neutral-600">{row.eu}</td>
                  <td className="py-3 text-neutral-600">{row.us}</td>
                  <td className="py-3 tabular-nums">{row.chest}</td>
                  <td className="py-3 tabular-nums">{row.waist}</td>
                  <td className="py-3 tabular-nums">{row.hips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-3 bg-neutral-50 border border-black/5 text-[11px] text-neutral-600 space-y-1">
          <p className="font-semibold text-black uppercase font-mono text-[10px]">
            EDITORIAL FIT NOTE:
          </p>
          <p>
            Zara pieces follow architectural tailored lines. For an exaggerated oversized look as styled in campaigns, select your true size. For a closer fit, we suggest sizing down.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-black/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-black text-white text-xs tracking-widest uppercase font-semibold hover:bg-neutral-800"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
