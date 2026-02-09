'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import styles from './About.module.css';

interface TimelineNode {
  id: string;
  yearLabel?: string;
  title: string;
  description?: string;
  isFuture?: boolean;
  isTransition?: boolean;
  connectsToBranch?: string;
  isCurrentPosition?: boolean;
  position?: number;
}

interface TimelineBranch {
  id: string;
  label: string;
  nodes: TimelineNode[];
  isPast?: boolean;
}

interface TimelineSVGProps {
  branches: TimelineBranch[];
}

/**
 * Maps node title to remove "N1:", "N2:", etc. prefixes
 */
function cleanNodeTitle(title: string): string {
  return title.replace(/^N\d+:\s*/, '');
}

/**
 * Splits branch label into two lines for better display
 */
function splitBranchLabel(label: string): [string, string] {
  const words = label.split(' ');
  if (words.length === 1) {
    return [words[0], ''];
  }
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

/**
 * Maps branch ID to color
 */
function getBranchColor(branchId: string): string {
  const colors: { [key: string]: string } = {
    'chef-work': '#e74c3c',
    'software-education': '#3498db',
    'software-experience': '#2ecc71',
  };
  return colors[branchId] || '#95a5a6';
}

/**
 * Maps branch to Y coordinate
 */
function getBranchY(branchId: string, branchIndex: number): number {
  const yPositions: { [key: string]: number } = {
    'chef-work': 100,
    'software-education': 220,
    'software-experience': 340,
  };
  return yPositions[branchId] || 100 + branchIndex * 120;
}

/**
 * Maps node to X coordinate based on node ID and position
 */
function getNodeX(nodeId: string, position: number, branchId: string, leftPadding: number = 0): number {
  // Fixed coordinate mapping based on the provided code
  const fixedPositions: { [key: string]: number } = {
    'restaurant-zest': -20,
    'bootcamp-start': 150,
    'dci-bootcamp': 150,
    'graduation': 400,
    'online-courses': 550,
    'internship': 400,
    'personal-projects': 550,
    'current-position': 800, // Will be replaced by Computer Science Degree
  };
  
  if (fixedPositions[nodeId]) {
    return fixedPositions[nodeId] + leftPadding;
  }
  
  // Fallback: map percentage to coordinate (0-100% maps to 80-1120)
  return 80 + leftPadding + (position / 100) * (1120 - 80);
}

/**
 * Gets branch start X coordinate
 */
function getBranchStartX(branchId: string): number {
  const startPositions: { [key: string]: number } = {
    'chef-work': -20,
    'software-education': 150,
    'software-experience': 400,
  };
  return startPositions[branchId] || 80;
}

/**
 * Gets branch transition X coordinate (where it becomes dashed)
 */
function getBranchTransitionX(branchId: string): number {
  // All branches transition at x=800 based on the provided code
  return 800;
}

export default function TimelineSVG({ branches }: TimelineSVGProps) {
  const { t } = useLanguage();
  
  // Left padding shifts all content right so Professional Chef label is fully visible
  const leftPadding = 180;
  const rightReduction = 100;

  // Right end of dashed lines (grey and colored) – shortened 60%, all align to this x
  const transitionX = 800 + leftPadding;
  const endXFull = 1120 + leftPadding - rightReduction;
  const dashedLinesEndX = transitionX + 0.4 * (endXFull - transitionX);

  // Blue/green (screenshot) content moved 15% left inside container
  const contentShiftFactor = 0.85;
  const shiftContentX = (x: number) => x * contentShiftFactor;
  // Blue/green content moved an extra 10% of blue line length left (graduation, online-courses, internship, personal-projects, Developer Experience label; green line extended)
  const blueLineLength = (800 + leftPadding) - (150 + leftPadding);
  const contentExtraLeft = 0.1 * blueLineLength;

  // Equal padding left and right; right edge ends after Future label + padding only
  const contentPadding = 40;
  const futureLabelX = shiftContentX(dashedLinesEndX) + 10;
  const contentMaxX = futureLabelX + 70; // Future label width + right padding only
  const contentMinX = -contentPadding;
  const totalWidth = contentMaxX + 2 * contentPadding;
  // Top row moved 3% up; container extended at top by same amount (longer at top)
  const svgHeight = 450;
  const topRowShiftUp = Math.round(svgHeight * 0.03); // 14
  const topRowY = 50 - topRowShiftUp; // 36
  const topLabelY = 35 - topRowShiftUp; // 21
  const viewBoxMinY = -topRowShiftUp; // -14: extra space above
  const viewBoxHeight = svgHeight + topRowShiftUp; // 464
  const contentViewBox = `${contentMinX} ${viewBoxMinY} ${totalWidth} ${viewBoxHeight}`;

  return (
    <div className={styles.timelineSVGWrapper}>
      <svg 
        viewBox={contentViewBox} 
        className={styles.timelineSVG}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={t('about.timeline.heading')}
      >
        {/* Background – equal padding left and right; y/height offset for 3% top crop */}
        <rect x={contentMinX} y={viewBoxMinY} width={totalWidth} height={viewBoxHeight} fill="#f8f9fa" className={styles.timelineBackground} rx="12" ry="12" />
        
        {/* Timeline markers */}
        {/* Year 2022 Node */}
        <g 
          className={styles.nodeGroup}
          pointerEvents="all"
          style={{ transformOrigin: `${60 + leftPadding - 80}px ${topRowY}px` }}
        >
          <circle 
            cx={60 + leftPadding - 80} 
            cy={topRowY} 
            r="9" 
            fill="#95a5a6" 
            stroke="white" 
            strokeWidth="2"
            className={styles.nodeCircle}
          />
          <text 
            x={60 + leftPadding - 80} 
            y={topLabelY} 
            textAnchor="middle" 
            fontSize="14" 
            fill="var(--color-dark-grey)" 
            fontWeight="500"
            fontStyle="italic"
            className={styles.timelineMarker}
          >
            {t('about.timeline.markers.startYear')}
          </text>
        </g>
        
        <text 
          x={shiftContentX(dashedLinesEndX) + 10} 
          y={topRowY} 
          textAnchor="start"
          fontSize="14" 
          fontStyle="italic" 
          fontWeight="500"
          className={styles.timelineMarker}
          dominantBaseline="middle"
        >
          {t('about.timeline.markers.future')}
        </text>
        
        {/* Top timeline line – ends at same x as branch dashed lines below */}
        <line 
          x1={60 + leftPadding - 80 + 9} 
          y1={topRowY} 
          x2={shiftContentX(dashedLinesEndX)} 
          y2={topRowY} 
          stroke="#95a5a6" 
          strokeWidth="2" 
          strokeDasharray="5,5" 
          opacity="0.6"
          strokeLinecap="round"
          className={styles.timelineTopLine}
        />
        
        {/* Year 2026 Node (10% left) */}
        <g 
          className={styles.nodeGroup}
          pointerEvents="all"
          style={{ transformOrigin: `${(650 + leftPadding) * 0.9}px ${topRowY}px` }}
        >
          <circle 
            cx={(650 + leftPadding) * 0.9} 
            cy={topRowY} 
            r="9" 
            fill="#95a5a6" 
            stroke="white" 
            strokeWidth="2"
            className={styles.nodeCircle}
          />
          <text 
            x={(650 + leftPadding) * 0.9} 
            y={topLabelY} 
            textAnchor="middle" 
            fontSize="14" 
            fill="var(--color-dark-grey)" 
            fontWeight="500"
            fontStyle="italic"
            className={styles.timelineMarker}
          >
            {t('about.timeline.markers.year2026')}
          </text>
        </g>
        
        {/* Branch Labels – same distance from label to first node on each branch */}
        {branches.map((branch, branchIndex) => {
          const [line1, line2] = splitBranchLabel(branch.label);
          const y = getBranchY(branch.id, branchIndex);
          const color = getBranchColor(branch.id);
          const labelGap = 32.15;
          const firstNodeX =
            branch.id === 'chef-work'
              ? getBranchStartX(branch.id) + leftPadding
              : branch.id === 'software-education'
                ? shiftContentX(getBranchStartX(branch.id) + leftPadding)
                : shiftContentX(getBranchStartX(branch.id) + leftPadding) - contentExtraLeft;
          const labelX = firstNodeX - labelGap;
          
          return (
            <g key={`label-${branch.id}`}>
              <text 
                x={labelX} 
                y={y - 5} 
                fontSize="15" 
                fontWeight="600" 
                fill={color} 
                textAnchor="end"
                className={styles.branchLabelText}
              >
                {line1}
              </text>
              {line2 && (
                <text 
                  x={labelX} 
                  y={y + 12} 
                  fontSize="15" 
                  fontWeight="600" 
                  fill={color} 
                  textAnchor="end"
                  className={styles.branchLabelText}
                >
                  {line2}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Branch Lines */}
        {branches.map((branch) => {
          const y = getBranchY(branch.id, 0);
          const color = getBranchColor(branch.id);
          const startX = getBranchStartX(branch.id) + leftPadding;
          const branchTransitionX = getBranchTransitionX(branch.id) + leftPadding;
          const isBlueOrGreen = branch.id === 'software-education' || branch.id === 'software-experience';
          const lineStartX = isBlueOrGreen ? shiftContentX(startX) : startX;
          const lineTransitionX = isBlueOrGreen ? shiftContentX(branchTransitionX) : branchTransitionX;
          const lineDashedEndX = (branch.id === 'chef-work' || isBlueOrGreen) ? shiftContentX(dashedLinesEndX) : dashedLinesEndX;
          const solidLineX1 = branch.id === 'software-experience' ? lineStartX - contentExtraLeft : lineStartX;
          const redEndAtNode = shiftContentX(800 + leftPadding);
          const solidLineX2 = branch.id === 'chef-work' ? redEndAtNode : lineTransitionX;
          const dashedLineX1 = branch.id === 'chef-work' ? redEndAtNode : lineTransitionX;
          
          return (
            <g key={`line-${branch.id}`}>
              {/* Solid line – red ends at future indicator node; green extended left */}
              <line 
                x1={solidLineX1} 
                y1={y} 
                x2={solidLineX2} 
                y2={y} 
                stroke={color} 
                strokeWidth="3" 
                strokeLinecap="round"
                className={styles.branchLineSolid}
              />
              {/* Dashed line – red starts at future indicator node */}
              <line 
                x1={dashedLineX1} 
                y1={y} 
                x2={lineDashedEndX} 
                y2={y} 
                stroke={color} 
                strokeWidth="3" 
                strokeDasharray="8,4" 
                opacity={branch.id === 'chef-work' ? 0.3 : 0.4} 
                strokeLinecap="round"
                className={styles.branchLineDashed}
              />
            </g>
          );
        })}
        
        {/* Connector Lines (second one between Graduation & green node – both shifted 15% left) */}
        <line 
          x1={shiftContentX(150 + leftPadding)} 
          y1="100" 
          x2={shiftContentX(150 + leftPadding)} 
          y2="220" 
          stroke="#95a5a6" 
          strokeWidth="2" 
          strokeDasharray="5,5" 
          opacity="0.6"
          className={styles.connectorLine}
        />
        <line 
          x1={shiftContentX(400 + leftPadding) - contentExtraLeft} 
          y1="220" 
          x2={shiftContentX(400 + leftPadding) - contentExtraLeft} 
          y2="340" 
          stroke="#95a5a6" 
          strokeWidth="2" 
          strokeDasharray="5,5" 
          opacity="0.6"
          className={styles.connectorLine}
        />
        
        {/* Nodes */}
        {branches.map((branch) => {
          const y = getBranchY(branch.id, 0);
          const color = getBranchColor(branch.id);
          
          return branch.nodes.map((node) => {
            // Skip current-position node as it's replaced by Computer Science Degree
            if (node.id === 'current-position') {
              return null;
            }
            
            const xBase = getNodeX(node.id, node.position || 0, branch.id, leftPadding);
            let x = (branch.id === 'software-education' || branch.id === 'software-experience')
              ? shiftContentX(xBase)
              : xBase;
            if (branch.id === 'chef-work' && node.id === 'bootcamp-start') {
              x = shiftContentX(150 + leftPadding);
            }
            const isExtraLeftNode =
              (branch.id === 'software-education' && (node.id === 'graduation' || node.id === 'online-courses')) ||
              branch.id === 'software-experience';
            if (isExtraLeftNode) {
              x -= contentExtraLeft;
            }
            const isTransition = node.isTransition || false;
            const cleanTitle = cleanNodeTitle(node.title);
            
            // Split title based on specific node requirements using translations
            let titleLines: string[] = [cleanTitle];
            
            // Map specific node titles to match provided design using translations
            if (node.id === 'dci-bootcamp') {
              titleLines = [t('about.timeline.nodes.dciBootcampLine1'), t('about.timeline.nodes.dciBootcampLine2')];
            } else if (node.id === 'online-courses') {
              titleLines = [t('about.timeline.nodes.onlineCoursesLine1'), t('about.timeline.nodes.onlineCoursesLine2')];
            } else if (node.id === 'internship') {
              titleLines = [t('about.timeline.nodes.internshipLine1'), t('about.timeline.nodes.internshipLine2')];
            } else if (node.id === 'personal-projects') {
              titleLines = [t('about.timeline.nodes.personalProjectsLine1'), t('about.timeline.nodes.personalProjectsLine2')];
            } else if (cleanTitle.length > 15 && !cleanTitle.includes('\n')) {
              // Generic split for long titles
              const spaceIndex = cleanTitle.lastIndexOf(' ', 15);
              if (spaceIndex > 0) {
                titleLines = [cleanTitle.substring(0, spaceIndex), cleanTitle.substring(spaceIndex + 1)];
              }
            }
            
            return (
              <g 
                key={node.id}
                className={`${styles.nodeGroup} ${isTransition ? styles.nodeTransition : ''}`}
                pointerEvents="all"
                style={{ transformOrigin: `${x}px ${y}px` }}
              >
                {/* Node circle */}
                <circle 
                  cx={x} 
                  cy={y} 
                  r={isTransition ? 11 : 9} 
                  fill={isTransition ? '#95a5a6' : color} 
                  stroke="white" 
                  strokeWidth={isTransition ? 3 : 2}
                  className={styles.nodeCircle}
                />
                {isTransition && (
                  <circle 
                    cx={x} 
                    cy={y} 
                    r="16" 
                    fill="none" 
                    stroke="#95a5a6" 
                    strokeWidth="2" 
                    opacity="0.3"
                    className={styles.nodeCircleOuter}
                  />
                )}
                
                {/* Node title */}
                {titleLines.map((line, index) => {
                  const isSingleLine = titleLines.length === 1;
                  const baseOffset = isSingleLine ? 30 : 40;
                  return (
                    <text 
                      key={`title-${index}`}
                      x={x} 
                      y={y - baseOffset + (index * 15)} 
                      textAnchor="middle" 
                      fontSize="12" 
                      fill="#34495e" 
                      fontWeight="600"
                      className={styles.nodeTitle}
                    >
                      {line}
                    </text>
                  );
                })}
                
                {/* Node description */}
                {node.description && (
                  <text 
                    x={x} 
                    y={y + 40} 
                    textAnchor="middle" 
                    fontSize="10" 
                    fill="#7f8c8d" 
                    fontStyle="italic"
                    className={styles.nodeDescription}
                  >
                    {node.description}
                  </text>
                )}
              </g>
            );
          });
        })}
        
        {/* Future Node: Computer Science Degree (shifted 15% left) */}
        <g 
          className={styles.nodeGroup}
          pointerEvents="all"
          style={{ transformOrigin: `${shiftContentX(800 + leftPadding)}px 220px` }}
        >
          <circle 
            cx={shiftContentX(800 + leftPadding)} 
            cy="220" 
            r="9" 
            fill="#3498db" 
            stroke="white" 
            strokeWidth="2"
            className={styles.nodeCircle}
          />
          <text 
            x={shiftContentX(800 + leftPadding)} 
            y="180" 
            textAnchor="middle" 
            fontSize="12" 
            fill="#34495e" 
            fontWeight="600"
            className={styles.nodeTitle}
          >
            {t('about.timeline.futureNode.titleLine1')}
          </text>
          <text 
            x={shiftContentX(800 + leftPadding)} 
            y="195" 
            textAnchor="middle" 
            fontSize="12" 
            fill="#34495e" 
            fontWeight="600"
            className={styles.nodeTitle}
          >
            {t('about.timeline.futureNode.titleLine2')}
          </text>
          <text 
            x={shiftContentX(800 + leftPadding)} 
            y="260" 
            textAnchor="middle" 
            fontSize="10" 
            fill="#7f8c8d" 
            fontStyle="italic"
            className={styles.nodeDescription}
          >
            {t('about.timeline.futureNode.description')}
          </text>
        </g>
        
        {/* Future indicator (red) – small circle only */}
        <g opacity="0.4" className={styles.futureIndicators}>
          <circle cx={shiftContentX(800 + leftPadding)} cy="100" r="5" fill="#e74c3c" />
        </g>
        {/* Future green node: Develop Own MVP (proper node with label & sublabel) */}
        <g
          className={styles.nodeGroup}
          pointerEvents="all"
          style={{ transformOrigin: `${shiftContentX(800 + leftPadding)}px 340px` }}
        >
          <circle
            cx={shiftContentX(800 + leftPadding)}
            cy="340"
            r="9"
            fill="#2ecc71"
            stroke="white"
            strokeWidth="2"
            className={styles.nodeCircle}
          />
          <text
            x={shiftContentX(800 + leftPadding)}
            y="315"
            textAnchor="middle"
            fontSize="12"
            fill="#34495e"
            fontWeight="600"
            className={styles.nodeTitle}
          >
            {t('about.timeline.futureGreenNode.title')}
          </text>
          <text
            x={shiftContentX(800 + leftPadding)}
            y="380"
            textAnchor="middle"
            fontSize="10"
            fill="#7f8c8d"
            fontStyle="italic"
            className={styles.nodeDescription}
          >
            {t('about.timeline.futureGreenNode.description')}
          </text>
        </g>
      </svg>
    </div>
  );
}
