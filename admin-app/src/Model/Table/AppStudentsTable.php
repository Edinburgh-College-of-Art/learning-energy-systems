<?php
namespace App\Model\Table;

use App\Model\Entity\AppStudent;
use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * AppStudents Model
 *
 * @property \Cake\ORM\Association\BelongsTo $AppSchools
 * @property \Cake\ORM\Association\BelongsTo $Uniques
 */
class AppStudentsTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->table('app_students');
        $this->displayField('name');
        $this->primaryKey('id');

        $this->belongsTo('AppSchools', [
            'foreignKey' => 'school_name',
            'className' => 'AppSchool'
            ]);
        $this->hasMany('AppData');
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->allowEmpty('id', 'create');

        $validator
            ->requirePresence('name', 'create')
            ->notEmpty('name');

        $validator
            ->add('year', 'valid', ['rule' => 'numeric'])
            ->requirePresence('year', 'create')
            ->notEmpty('year');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules)
    {
        $rules->add($rules->existsIn(['app_school_id'], 'AppSchools'));
        $rules->add($rules->existsIn(['unique_id'], 'Uniques'));
        return $rules;
    }
}
