// BIDS Entities Constants

export const DS_DATASET = 'ds__dataset';
export const DS_DATASET_TYPE = 'ds__dataset_type';
export const DS_DATASET_PATH = 'ds__dataset_path';
export const DS_DATASET_DESCRIPTION = 'ds__dataset_description';

export const ENT_SUB = 'ent__sub';
export const ENT_SES = 'ent__ses';
export const ENT_SAMPLE = 'ent__sample';
export const ENT_TASK = 'ent__task';
export const ENT_ACQ = 'ent__acq';
export const ENT_CE = 'ent__ce';
export const ENT_TRC = 'ent__trc';
export const ENT_STAIN = 'ent__stain';
export const ENT_REC = 'ent__rec';
export const ENT_DIR = 'ent__dir';
export const ENT_RUN = 'ent__run';
export const ENT_MOD = 'ent__mod';
export const ENT_ECHO = 'ent__echo';
export const ENT_FLIP = 'ent__flip';
export const ENT_INV = 'ent__inv';
export const ENT_MT = 'ent__mt';
export const ENT_PART = 'ent__part';
export const ENT_PROC = 'ent__proc';
export const ENT_HEMI = 'ent__hemi';
export const ENT_SPACE = 'ent__space';
export const ENT_SPLIT = 'ent__split';
export const ENT_RECORDING = 'ent__recording';
export const ENT_CHUNK = 'ent__chunk';
export const ENT_ATLAS = 'ent__atlas';
export const ENT_RES = 'ent__res';
export const ENT_DEN = 'ent__den';
export const ENT_LABEL = 'ent__label';
export const ENT_DESC = 'ent__desc';
export const ENT_DATATYPE = 'ent__datatype';
export const ENT_SUFFIX = 'ent__suffix';
export const ENT_EXT = 'ent__ext';
export const ENT_EXTRA_ENTITIES = 'ent__extra_entities';

export const META_JSON = 'meta__json';

export const FINFO_FILE_PATH = 'finfo__file_path';
export const FINFO_LINK_TARGET = 'finfo__link_target';
export const FINFO_MOD_TIME = 'finfo__mod_time';

export const ALL_ENTITIES = [
    ENT_SUB,
    ENT_SES,
    ENT_SAMPLE,
    ENT_TASK,
    ENT_ACQ,
    ENT_CE,
    ENT_TRC,
    ENT_STAIN,
    ENT_REC,
    ENT_DIR,
    ENT_RUN,
    ENT_MOD,
    ENT_ECHO,
    ENT_FLIP,
    ENT_INV,
    ENT_MT,
    ENT_PART,
    ENT_PROC,
    ENT_HEMI,
    ENT_SPACE,
    ENT_SPLIT,
    ENT_RECORDING,
    ENT_CHUNK,
    ENT_ATLAS,
    ENT_RES,
    ENT_DEN,
    ENT_LABEL,
    ENT_DESC,
    //ENT_DATATYPE,
    //ENT_SUFFIX,
    //ENT_EXT,
    //ENT_EXTRA_ENTITIES not an entity
];

// Mapping of all BIDS-related constants to emojis
export const ENTITY_TO_EMOJI: { [key: string]: string } = {
    // Dataset-related entities
    [DS_DATASET]: '📂',                // Dataset
    [DS_DATASET_TYPE]: '📑',           // Dataset type
    [DS_DATASET_PATH]: '🛤️',          // Dataset path
    [DS_DATASET_DESCRIPTION]: '📝',    // Dataset description
  
    // Entity-related entities
    [ENT_SUB]: '🧑',                   // Subject
    [ENT_SES]: '📅',                   // Session
    [ENT_SAMPLE]: '🧪',                // Sample
    [ENT_TASK]: '📝',                  // Task
    [ENT_ACQ]: '🎥',                   // Acquisition
    [ENT_CE]: '💉',                    // Contrast-enhanced
    [ENT_TRC]: '🧬',                   // Tracer
    [ENT_STAIN]: '🎨',                 // Stain
    [ENT_REC]: '📷',                   // Recording
    [ENT_DIR]: '📁',                   // Direction
    [ENT_RUN]: '🏃',                   // Run
    [ENT_MOD]: '⚙️',                  // Modality
    [ENT_ECHO]: '🔄',                  // Echo
    [ENT_FLIP]: '↕️',                 // Flip
    [ENT_INV]: '🔄',                   // Inversion
    [ENT_MT]: '🧲',                    // Magnetization Transfer
    [ENT_PART]: '🧩',                  // Part
    [ENT_PROC]: '🔬',                  // Process
    [ENT_HEMI]: '🧠',                  // Hemisphere
    [ENT_SPACE]: '🌍',                 // Space
    [ENT_SPLIT]: '🔪',                 // Split
    [ENT_RECORDING]: '🎙️',            // Recording
    [ENT_CHUNK]: '📦',                 // Chunk
    [ENT_ATLAS]: '🗺️',                // Atlas
    [ENT_RES]: '📐',                   // Resolution
    [ENT_DEN]: '🧱',                   // Density
    [ENT_LABEL]: '🏷️',                // Label
    [ENT_DESC]: '📝',                  // Description
    [ENT_DATATYPE]: '🗂️',             // Datatype
    [ENT_SUFFIX]: '🔗',                // Suffix
    [ENT_EXT]: '📄',                   // Extension
    [ENT_EXTRA_ENTITIES]: '➕',        // Extra entities
  
    // Metadata-related entities
    [META_JSON]: '📜',                 // JSON metadata
  
    // File information-related entities
    [FINFO_FILE_PATH]: '🛤️',         // File path
    [FINFO_LINK_TARGET]: '🔗',        // Link target
    [FINFO_MOD_TIME]: '⏲️',         // Modification time
  };