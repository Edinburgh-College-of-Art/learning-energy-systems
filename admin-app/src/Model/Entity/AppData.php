<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * AppData Entity.
 *
 * @property int $id
 * @property int $app_students_unique_id
 * @property \App\Model\Entity\AppStudentsUnique $app_students_unique
 * @property string $subject
 * @property int $light
 * @property int $computer
 * @property int $heater
 * @property int $projector
 * @property string $lightString
 * @property string $computerString
 * @property string $heaterString
 * @property string $projectorString
 * @property \Cake\I18n\Time $date
 * @property \Cake\I18n\Time $time_inserted
 */
class AppData extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        '*' => true,
        'id' => false,
    ];
}
